# Token-Trading-Platform
Platform to trade tokens in web3 space. This is a system in which different tokens could be exchanged.

# Steps

Starting New Project (create a new branch)
```bash
git checkout -b base-project
```
Initalise Project
```bash
npm init -y
``` 
Install typescript
``` bash
npm install typescript --save-dev ()
```
Install nodejs types
```bash
npm install @types/node --save-dev
```
Tsconfig
```bash
npx tsc --init --rootDir src --outDir build \ --esModuleInterop --resolveJsonModule --lib es6 \ --module commonjs --allowJs true --noImplicitAny true 
```
Create source folder
```bash
mkdir src
```
Create main file index.ts in src folder
```ts
console.log("Hello world!");
```
Run the file
```bash
npx ts-node ./src/index.ts
```
Commit the changes and push it.
```bash
git commit -m "base project"
git push -u origin base-project
```
Merge branch base-project and main
```bash
git checkout main
git merge base-project
```