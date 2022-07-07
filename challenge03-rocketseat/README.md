Everyone know that TS is a superset of JS, so TS has every tool from JS 
and more (the TYPES!). Let's focus here how we can start a TS NODE PROJECT
STEP BY STEP:

//package manager initiation
yarn init -y

//adding typescript
yarn add typescript

//adding ts-node-dev -> it's a tool that help us to running our code, 
//obvious on the development environment
yarn add ts-node-dev

//creating a dev script on the package.json
ts-node-dev —transpile-only —ignore-watch node_modules --respawn src/server.ts

//creating the tsconfig file
yarn tsc -init

//running our code 
yarn dev
