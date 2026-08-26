Configurare Typescript 

1. install Node.js
2. open VS Code terminal and type this : npm install -g typescript
3. create a folder  
4. in the folder created type : npm init -y
5. install locally typescript : npm install --save-dev typescript
6. run command : npx tsc --init 
7. in root directory , create a folder : src 
8. in src folder , create a file : app.ts 
9. in package.json add this line on the "scripts" :   "dev": "tsc && node ./dist/app.js"
10. run command : npm run dev
  