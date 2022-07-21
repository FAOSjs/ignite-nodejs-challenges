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

Integration Test: 
### 1.2 Tests - How it Works
### 1.3 Tests - Usage/Problems that solve
Unit: When you test pieces of your code, you have more confidence to make more connections, 
to progress, and obvious, check if the part of your code is working

Integration:

---
---

🔹 CHAPTER V
<br/>
---
#### 📌 TOPICS
      1. Email
      2. More about test (Jest Coverage)
#### 🎯 SUBTOPICS
      1. What is it
      2. How it Works
      3. Usage/Problems that solve


---
---

🔹 CHAPTER VI
<br/>
---
#### 📌 TOPICS
      1. AWS (SES, S3 and EC2)
#### 🎯 SUBTOPICS
      1. What is it
      2. How it Works
      3. Usage/Problems that solve
