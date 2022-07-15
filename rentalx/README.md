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


---
---

🔹 CHAPTER IV
<br/>
---
#### 📌 TOPICS
      1. Test (Unit and Integration)
#### 🎯 SUBTOPICS
      1. What is it
      2. How it Works
      3. Usage/Problems that solve


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
