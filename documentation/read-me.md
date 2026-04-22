# Framework Design - Step by Step

## 1. Creating Local working directory with in the Local Workspace

Local Working Directory : playwright-tdd-framework
 cmd : cd playwright-tdd-framework

 ## 2. Install necessary dependencies based on our project requirements. 

    1. playwright : npm init playwright@latest  => web/api automation
    2. typescript : npm install typescript => programming language
    3. ts-node : npm install ts-node => to run tyscript programs with node js
    4. types/node : npm install @types/node => file handling and command line execution
    5. postgres DB : npm install pg @types/pg
    6. excel : npm install excel xlsx
    7. pdf file : npm install pdf-parse

## 3. Setup global configurations
    1. add ts config => npx tsc --init
    2. add project configurations :    package.json 
     "type":"module"

    3. add typescript configurations : tsconfig.json
    "noEmit": true,
    "allowImportingTsExtensions": true,

## 4. Adding folder structure to maintain different components of framework

1. config => config.json 

to store configuration details for UI , API and DB
Example : Application URL, Crdentials, DB Connection details etc..

 2. testdata => ui/api/db => data.json

 to store test data related to each test script w.r.t UI/API/DB/AI

 3. screenshots => 

 to store screenshots captured during test failures

 4. files =>

 to store flat files related to automation like excel, pdf, img etc..

 5. utils =>

 to maintain helper utility common methods for framework
 Example : Excel Reader , PDF reader

 6. commons => ui/db/api => commons.ts

 to maintain all the common methods

 7. page-objects => page-elements / page-steps

 to maintain page-wise elements and steps to implement page object model

8. tests ==>

to maintain test scripts







