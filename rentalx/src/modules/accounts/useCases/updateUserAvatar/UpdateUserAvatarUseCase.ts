import { inject, injectable } from "tsyringe";
import injectionTokensMap from "../../../../shared/container/injectionTokensMap";
import { IStorageProvider } from "../../../../shared/infra/providers/storage/IStorageProvider";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
   user_id: string;
   avatar_file: string;
}

@injectable()
class UpdateUserAvatarUseCase{

   constructor(
      @inject("UsersRepository")
      private usersRepository: IUsersRepository,
      @inject(injectionTokensMap.StorageProvider)
      private storageProvider: IStorageProvider
   ){}

   async execute({ user_id, avatar_file}: IRequest): Promise<void>{
      const user = await this.usersRepository.findById(user_id)
      if(user.avatar) await this.storageProvider.delete(avatar_file, "avatar")
      await this.storageProvider.save(avatar_file, "avatar")

      user.avatar = avatar_file

      await this.usersRepository.create(user)
   }
}

export { UpdateUserAvatarUseCase }