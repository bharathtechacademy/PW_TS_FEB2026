## Playwright BDD framework design - step by step 

# 1. Creating a local working directory within the workspace =>  playwright-bdd-framework
goto terminal => cd playwright-bdd-framework

# 2. Install necessary dependencies based on our project requirements. 
1. TypeScript, ts-node, tsx & types/node : npm install typescript ts-node @types/node => npx tsc --init  => TypeScript configurations to run the project with Playwright along with TypeScript 
2. Playwright : npm init playwright@latest  => Web and API Automation. 
3. Cucumber : npm install @cucumber/cucumber => To set up Cucumber BDD framework to accommodate feature file step definitions and Cucumber configurations 
4. pg : npm install pg @types/pg => To connect Postgres SQL database server within the Playwright framework 
5. excel : npm install excel xlsx => To connect Excel-related files and to read the data within the framework 
6. pdf : npm install pdf-parse-new => To read the content from PDF files 

# 3. Set up the global configurations within the package.json and tsconfig.json
1. package.json => "type" : "module"
2. tsconfig.json => "noEmit": true
3. tsconfig.json => "allowImportingTsExtensions": true    

# 4. Set up the folder structure to maintain different components of the framework. 
1. commons => To maintain the common methods related to UI, API, database, and load testing 
2. config => To maintain the configuration data like application URLs, API base URL, credentials, and other common configurations 
3. files => To maintain the flat files that need to be used during the execution process 
4. features => To maintain the cucumber feature files for UI, API, database, and load testing 
5. step-definitions => To maintain the step definition for each and every step written in the Cucumber feature file 
6. support => To maintain the hooks.ts and world.ts file related to cucumber configurations 
7. utils => To maintain the helper methods or utilities 
8. page-objects => To maintain page-wise locators and page-wise common methods separately to implement the page object model design pattern 
9. testdata => To maintain the additional data along with data added in the feature files
10. screenshots => To maintain the screen shots related to failure test cases 
11. reports => To maintain the test results report 

# 5. Set up the Cucumber Configuration
Create cucumber.cjs file to maintain the configurations related to the feature files, step definitions, and the test results report that needs to be generated every time. 

module.exports = {
  default: {
    paths: ['features/**/*.feature'], 
    loader: ['ts-node/esm'],
    import: ['support/**/*.ts', 'step-definitions/**/*.ts'],
    format: ['progress-bar', 'html:reports/cucumber-report.html'],
    publishQuiet: true
  }
};

paths: ['features/**/*.feature'] => To maintain the default path or folder to recognize and run the feature files 
loader: ['ts-node/esm'] => It will support running the TypeScript file by using ES6 modules. 
import: ['support/**/*.ts', 'step-definitions/**/*.ts']  => To maintain background step definition for each and every test step 
format: ['progress-bar', 'html:reports/cucumber-report.html'] => Where exactly do you want to generate the test results report after completing the execution process
publishQuiet: true => Ignore printing the messages in the console during the execution process. 

