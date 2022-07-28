🧩 THE MAIN COURSE CHALLENGE: Rentalx API
<br/>
---

<br/>

### 🗣 Talking about the challenge
Rentalx is a API develop during the course. It's the main project develop in the course. Rentalx is used to help with cars rentals.

---

❗ <b>OBS:</b> In the topics I'll put the main concepts that I had learn 

🔹 CHAPTER II
<br/>
---
#### 📌 TOPICS
      1. Swagger
      2. Multer, File Upload and Stream
      3. Singleton
      
#### 🎯 SUBTOPICS
      1. What is it
      2. How it Works
      3. Usage/Problems that solve
      
#### 🎇 EXTRA
      1. Debug VS code

### 1.1 Swagger - What is it
Swagger is a tool to build your documentation. Swagger give us a UI that allow us to test the application and make the informations more clearly.

### 1.2 Swagger - How it Works
First, let me explain how to implement swagger in nodejs:

setting a route to swagger UI and setup your swagger json file (where you build your documentation)
`app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFile))`

### 1.3 Swagger - Usage/Problems that solve
Help to build and view your documentation

---

### 2.1 Multer and Stream - What is it
Multer is a Dependency;

Stream represent a bits sequency, a data-handling method.

### 2.2 Multer and Stream - How it works
Multer: It's used as a middleware for handling multipart/form-data (attribute using in file upload).
This dependency modify the request adding a new propertie, file(s), to store the uploaded file information;

Stream: Imagine a machine that breaks big stones into gravel and pipe it to some place that you want. 
It's a analogy to STREAM. The big stones is large files, the gravel is chunks and we can pipe it to some destination.
Stream has types: Readable (when you get pieces of data from outside) and Writable (when you send pieces of data to some destination)

### 2.3 Multer and Stream - Usage/Problems that solve
Multer: File upload;

Stream: It's used to process large amounts of data.

---

### 3.1 Singleton - What is it
It's a pattern that the porpuse is to create one single instance of a class.

### 3.2 Singleton - How it Works
Here I'll explain how to implement the pattern:
1. Create a propertie to store the INSTANCE of the class, 
and that propertie need to be private(only the own class can access) and static(doesn't need instanciation to be access);
2. Your constructor need to be private (other class/objects can use the `new` operator);
3. To finish, create a method to get/set the instanciation to instance propertie, let me explain this method:
    
      3.1. Check if the class already has a instanciation on the cache,
            if has return the instance, if not, return a new instance.
            
IMPLEMENTATION:

            class myRepository{
                  private static INSTANCE
                  
                  private constructor(){}
                  
                  public static createInstance(){
                        if(myRepository.INSTANCE) return myRepository.INSTANCE
                        
                        return new myRepository()
                  }
            }

### 3.3 Singleton - Usage/Problems that solve
Here Singleton was used to prevent that the repositories has more than one single instance 
(if multiple instance, we lost data and we can't make test using data in memory)

### How to debug your application on VS Code:
   1. Open debug window
   2. Create a launch.json file
   3. Change properties: 
   "type”: “pwa-node” →→ "type": “node" and “request”: “launch” →→ "request": “attach”(debug will run only when you want)
   4. Remove "program" propertie
   5. add --inspect to your dev script on the package.json to connect your application with debug function
   6. Now play debug clicking on the green button


---
---
   
🔹 CHAPTER III
<br/>
---
#### 📌 TOPICS
      1. Dependency Injection and TSyringe
      2. JWT, Authentication and Authorization
#### 🎯 SUBTOPICS
      1. What is it
      2. How it Works
      3. Usage/Problems that solve


### 1.1 D.I and TSyringe - What is it
Dependency Injection is nothing more than a technique used so that a function or objects receives(through injection)
other objects or functions that it uses/depends on. TSyringe is a tool that facilitates it to us. TSyringe is a 
dependency injection CONTAINER, ie, it automates the process managing objects (instanciation/creating and injection).

### 1.2 D.I and TSyringe - How it Works

There are four "players" in D.I: 
- The service/isolated functionality that you want to use/inject in some class/function;
- The client/main class that uses/receive through the injection the service;
- The injector which creates a service instance and injects it into the client;
- And in some cases, we have the interface that’s used by the client and implemented by the service.

Let's understand using the rentalx code:
- Controllers is a injector, because it import the service and call the TSyringe to instanciates and injects
the service into the client;

      const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase)
      const authenticateInfos = await authenticateUserUseCase.execute({ email, password })
- useCases is a client, it uses/receive through the injection the service and depends on service interface.
            @injectable()
            class AuthenticateUserUseCase{
               constructor(
                  @inject("UsersRepository")
                  private usersRepository: IUsersRepository,
     
- Repositories and Providers is service/isolated functionality. It also implements its interface.

      container.registerSingleton<IUsersRepository>(
         "UsersRepository",
         UsersRepository
      )

Now let's understand how TSyringe works? TSyringe help us with the D.I lifecycle:
- Register: It's basically the first process that happen in D.I lifecycle. Where you tell
to container to mapping the services and its types, to when you need to instanciate some service,
it, TSyringe, knows which instanciates.

      //Hey, container! Register a singleton to such type
      container.registerSingleton<IUsersRepository>(
         "UsersRepository",
         UsersRepository
      )
- Resolve: It's when the container creates and injects the dependencies to the client, resolving it.

      const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase)
- And too it has the part of managing of the dependent objects.

      @injectable()
      class AuthenticateUserUseCase{
         constructor(
            @inject("UsersRepository")
            private usersRepository: IUsersRepository,
      
### 1.3 D.I and TSyringe - Usage/problems that solve

D.I. help us with *coupling*, because this technique is based on single responsibility principle
and you can also use the dependency inversion principle

---

### 1.1 JWT - What is it 
Json Web Tokens are credentials that carries with it some resources, so we can use it to 
authentication and Authorization

### 1.2 JWT - How it Works
- Creating token:

      const token = sign({}, SECRET_TOKEN, {
         subject: PAYLOAD,
         expiresIn: "3d",
      })
- Verifying token:

      const { sub: PAYLOAD } = verify(
         REQUEST_TOKEN, 
         SECRET_TOKEN
      )

### 1.3 JWT - Usage/Problems that Solve
JWTs helps us carrying information in a security way to be used in authentication or authorization

---
---

🔹 CHAPTER IV
<br/>
---
#### 📌 TOPICS
      1. Tests (Unit and Integration)
#### 🎯 SUBTOPICS
      1. What is it
      2. How it Works
      3. Usage/Problems that solve

### 1.1 Tests - What is it
Unit Test: It's a technique to test parts/pieces of your code. 
It's when you check if the piece (function, class, etc), works as it 
should. And this happen when you run your app piece isolated

Integration Test: This technique happen, usually, after unit test, because here is tested a combination
of modules. In rentalx we use this technique to test the routes.

### 1.2 Tests - How it Works
Unit Test: 
- Scripts

      yarn jest --init
      yarn ts-jest -D
      
- Changes in jest.config file

      //testMatch - where you put your test files path
      //bail - This propertie is used to stop or not when test fail
      testMatch: [pathtotestsfile/*.spec.ts]
      
      bail: true
      
- Understanding test code

      //describe is used to group tests
      describe("CREATING A CATEGORY", () => {

         //before each test, it does the D.I, creating an useCase to each test
         beforeEach(() => {
            categoriesRepositoryInMemory = new CategoriesRepositoryInMemory()
            createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory)
         })

         //it is where you put your test logic
         it("[CreateCategoryUseCase] - should be able to create a new category", async () => {
            const category = {
               name: "Category name test",
               description: "Category created only to test the func"
            }

            await createCategoryUseCase.execute(category)

            const categoryCreated = await categoriesRepositoryInMemory.findByName(category.name)

            expect(categoryCreated).toHaveProperty("id")
         })  
         
Integration Test: 
- Adding supertest dependency to be able to run a localhost to test

      yarn add supertest @types/supertest
      
- Code

      import request from "supertest"
      import { Connection, createConnection } from "typeorm"

      import { app } from "../../../../shared/infra/expressHttp/app"

      let connection: Connection
      describe("CREATE CATEGORY CONTROLLER", () => {
      
         //before all tests, create connection to test DB and run migrations
         beforeAll(async () => {
         
            connection = await createConnection()
            await connection.runMigrations()

            const id = uuidv4()
            const password = await hash("test", 8)

            await connection.query(
               `INSERT INTO USERS(id, name, username, email, password, "isAdmin", created_at, driver_license)
                  VALUES('${id}', 'tester', 'test','test@test', '${password}', true, 'now()', 'XXXXXX')
               `
            )
         })

         // after all tests, drop DB and close connection
         afterAll(async () => {
            await connection.dropDatabase()
            await connection.close()
         })

         it("should be able to create a new category", async () => {
            const responseToken = await request(app)
               .post("/sessions")
               .send({
                  email: "test@test",
                  password: "test"
               })

            const {refresh_token} = responseToken.body

            const response = await request(app)
               .post("/categories")
               .send({
                  name: "SUV",
                  description: "A sigla SUV significa Sport Utility Vehicle -- ou seja, veículo utilitário esportivo"
               })
               .set({
                  authorization: refresh_token
               })

            expect(response.status).toBe(201)
         })

### 1.3 Tests - Usage/Problems that solve
Unit: When you test pieces of your code, you have more confidence to make more connections, 
to progress, and obvious, check if the part of your code is working

Integration: Check if the parts are working well together

---
---

🔹 CHAPTER V
<br/>
---
      
#### 🎇 EXTRA
      1. Jest Coverage
      
### How to use Jest Coverage
      1. Change the follow properties in jest config file
            collectCoverage: false --> to --> true
            collectCoverageFrom: [pathToFilesThatYouWantToCheckIfWasTested]
            coverageDirectory: "coverage"
            coverageReporters: ["lcov", "text-summary"]
      
      
---
---

🔹 CHAPTER VI
<br/>
---
#### 📌 TOPICS
      1. S3
      2. SES
      3. EC2
#### 🎯 SUBTOPICS
      1. What is it
      2. How it Works
      
#### 🎇 EXTRA
      1. CI/CD
      
### 1.1 S3 - What is it
Amazon Simple Storage Service (Amazon S3) is an object storage service that offers industry-leading scalability, 
data availability, security, and performance." It is mostly used to store application files in the CLOUD.

### 1.2 S3 - How it Works
![product-page-diagram_Amazon-S3_HIW cf4c2bd7aa02f1fe77be8aa120393993e08ac86d](https://user-images.githubusercontent.com/107777870/180307344-56386267-51c8-4e10-84e0-6e719c1c1593.png)

As you can see, S3 doesnt have a hard structure to understand, now, let's go understand the main players:
- Bucket - It's looks like a folder. It used to store files or metadata of the files. Every Bucket has a name and AWS region
- Object - It's a file or a metadata as I said before, yes, it's named as a object. All objects, stored in a container, 
has a URL, like that: https://EXAMPLE-BUCKET-NAME.s3.REGION.amazonaws.com/PATH-TO-FILE
- Keys - It's a object identifier likes a path.
- Region - It's where(geographically speaking) your bucket is stored.
- Access control lists (ACLs) - It's a way to manage permission to your buckets and/or objects



WHAT I DID TO SETUP S3 IN THIS PROJECT
- Create a IAM User (copy two keys) with S3 FULL ACCESS PERMISSION
- Create the bucket
- Put the enviroment variables on the .env file to sdk recognize your account
- install the SDK and hands on

### 2.1 SES - What is it
Amazon Simple Email Service (Amazon SES) is a simple way to send email using your email address or domain.

### 2.2 SES - How it Works

![arch_overview-diagram](https://user-images.githubusercontent.com/107777870/181379630-69ffa3be-962d-4203-a5d9-0728645632cb.png)

1. A client application, acting as an email sender, makes a request to Amazon SES to send email to one or more recipients.
2. If the request is valid, Amazon SES accepts the email.
3. Amazon SES sends the message over the Internet to the recipient's receiver. Once the message is passed to Amazon SES, it is usually sent immediately, with the first delivery attempt normally occurring within milliseconds.
4. At this point, there are different possibilities. For example:
    1. The ISP successfully delivers the message to the recipient's inbox.
    2. The recipient's email address does not exist, so the ISP sends a bounce notification to Amazon SES. Amazon SES then forwards the notification to the sender.
    3. The recipient receives the message but considers it to be spam and registers a complaint with the ISP. The ISP, which has a feedback loop set up with Amazon SES, sends the complaint to Amazon SES, which then forwards it to the sender.

After a sender sends an email request to Amazon SES, there are two situation:
- Successful situation: You receive an message ID to identify your email and your email is send over the internet using SMTP.
- Failed situation: If you are using an AWS SDK for a programming language that uses exceptions, the call to Amazon SES will throw a *MessageRejectedException*. (The name of the exception may vary slightly depending on the SDK.)

WHAT I DID TO SETUP SES IN THIS PROJECT
- You need to have a domain and an email
- Verify domain and email in the amazon SES console
- Click on the verified domain and catch the keys and put on the
domain console (google domains)
- Add a SES permission to your IAM user

### 3.1 EC2 - What is it
Amazon Elastic Compute Cloud (Amazon EC2) provides scalable computing capacity in the Amazon Web Services (AWS) Cloud. 


WHAT I DID TO SETUP EC2 IN THIS PROJECT
- Create the instance and download the keys that allow you to use your instance
- open your client ssh following the aws steps
- Config your Ubuntu instance, like that:
    - **SUDO ADDUSER [USERNAME]**
    creating an user in ubuntu instance to isolate your application from others process. USERNAME=app
    - **SUDO USERMOD -aG SUDO [USERNAME]**
    giving sudo permission to app
    - **SUDO SU - [USERNAME]**
    opening app in sudo mode
    - **MKDIR .SSH**
    creating a folder to put SSH keys
    - **CHMODE 700 .SSH**
    - **CREATE AUTHORIZED KEY FILE AND PASTE THE SSH KEY FROM YOUR LOCALMACHINE**
    this SSH process is used to allow the access through the user
    - **UPDATE YOUR INSTANCE**
    sudo apt update
    - **INSTALL THE DEPENDENCIES**
    docker, node, yarn, etc
- Install babel dependencies(babel's presets and plugins) and config it (babel config file)
- Create your build script
- **SUDO GRUPADD DOCKER**
- **SUDO USERMODE -aG DOCKER $USER**
    to give permission to docker and your user to use it
    
### UNDERSTAND CI/CD PROCESS
- First we need to clone the application (here I did that using github)
      - I created a ssh key and put it in GitHub to allow the instance to manage the repository
      - To finish I cloned the repository to my instance
      - I installed dependencies using yarn
- Creating GitHub Actions
      - Create SSH key in your machine and paste (the .pub key file) in ssh file created at ubuntu instance
      - Create four secrets keys (host, key, user, port) in the repository settings
      - Create a action by your self
- Proxy Reverso
      - Install nginx
      - Config your file and create a simbolic link
- Domain and SSL
      - Create a public hosted zone using AWS Route 53
      - Accessing your hosted zone, you need to create a register
      - Config your domain DNS adding a new resource to your register
      - Get your SSL certificate using certbot tool
 
