import { ICategoriesRepository, ICreateCategoryDTO } from '../../repositories/ICategoriesRepository'

import fs from 'fs'
import {parse} from 'csv-parse'
import { inject, injectable } from 'tsyringe'
import { AppError } from '../../../../shared/errors/AppError'

@injectable()
class ImportCategoryUseCase {

   constructor(
      @inject("CategoriesRepository") 
      private categoriesRepository: ICategoriesRepository
   ){}

   private loadCategories(file: Express.Multer.File): Promise<ICreateCategoryDTO[]> {
      return new Promise((resolve, reject) => {
         if(file.mimetype === "text/csv"){
            const categories: ICreateCategoryDTO[] = []
   
            const stream = fs.createReadStream(file.path)
      
            const parseFile = parse()
      
            stream.pipe(parseFile)
      
            parseFile.on("data", async (line) => {
               const [name, description] = line
   
               categories.push({
                  name, 
                  description
               })
            })
            .on("end", () => {
               fs.promises.unlink(file.path)
               resolve(categories)
            })
            .on("error", (err) => reject(err))   
   
         }else reject("file type isn't suported!")
      })
   } 

   async execute(file: Express.Multer.File): Promise<void>{
      const categories = await this.loadCategories(file)

      let error;

      categories.forEach(async category => {
         const { name, description } = category

         const categoryAlreadyExists = await this.categoriesRepository.findByName(name)
         if(categoryAlreadyExists) error = new AppError('category name already exists!')
         
         await this.categoriesRepository.create({
            name,
            description
         })
      })

      if(error) throw error
   }
}

export { ImportCategoryUseCase }