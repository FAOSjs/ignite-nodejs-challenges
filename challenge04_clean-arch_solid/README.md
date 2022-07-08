🧩 Challenge 04
<br/>
---

<br/>

### 🗣 Talking about the challenge
In this challenge I was introduced to clean architecture and SOLID principles. It's a CRUD too, but now I needed to put my knowledges about clean arch and solid obtained in the course

<b>❗ OBS:</b> I'm talking here about basic knowledges about Clean Arch and SOLID (because only S and D was explored here)

---

❗ OTHER OBS HERE! I'LL TALK ABOUT WHAT I UNDERSTOOD, WITH SIMPLE SEARCH

#### 📌 TOPICS:
      1. Clean Architecture;
      2. SOLID;

#### 📌 SUBTOPICS:
      1. What is it;
      2. How it Works;
      3. Usage/Problems that solve.

---

### 1.1 Clean Architecture -> What is it
   It's a strategy to organize your archicture into ring levels

### 1.2 Clean Architecture -> How it Works
   As I said before, C.A works with ring levels/layers.
   Inner Layers are policies, there is no frameworks/dependencies there,
   outer circles are mechanisms(frameworks, dependencies or interfaces):
   
   Entities -> Its responsibility is to describe the main participants 
   of the business logic (that isn't limited to your application);
   
   Use Cases -> It orchestrates the flow of data into and out of entities 
   and invokes them to use their enterprise wide business rules;
   
   Interface Adapters -> Does the translation between external world 
   and the use cases;
   
   Frameworks And Drivers -> Here it's where all the details go, like: 
   Express or NestJS, Laravel, MomentJS or DateJS, etc.

### 1.3 Clean Archicture -> Usage/Problems that solve
   - High coupling
   - Dependencies very "tied" to functionality
   - Business logic in different places/layers, some times the same logic.


Do you want to learn more? Follow:
https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html

---

### 2.1 SOLID -> What is it
   It's a set of principles

### 2.2 SOLID -> How it Works
   SOLID splitted is this:
   
   S -> Single Responsability Principle;
   
   O -> Open-Closed;
   
   L -> Liskov Substitution;
   
   I -> Interface Segragation;
   
   D -> Dependency Inversion: let's do things clearer here.
   High-level modules should not depend on low-level modules. 
   Both should depend on abstractions.

### 2.3 SOLID -> Usage/Problems that solve
   SOLID help us to develop a code more:
   - extandable
   - readable
   - logical
   - maintainable
