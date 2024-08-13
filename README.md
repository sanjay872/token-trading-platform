# Token-Trading-Platform
Platform to trade tokens in web3 space. This is a system in which different tokens could be exchanged.

# Steps

# week 1

Project Intro

# week 2

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
Add changes, commit changes and push it.
```bash
git add .
git commit -m "base project"
git push -u origin base-project
```
Merge branch base-project and main
```bash
git checkout main
git merge base-project
```

# week 3

Session about Token ERC20.

# week 4

Session on intent, intent protocol, event listener.

# week 5

Read Across docs (https://docs.across.to/)
    - Intent Lifecycle (https://docs.across.to/concepts/intent-lifecycle-in-across)
    - Tracking Events (https://docs.across.to/reference/tracking-events)
    - Repo (https://github.com/across-protocol/contracts)
        - clone it
        - run yarn to install all packages