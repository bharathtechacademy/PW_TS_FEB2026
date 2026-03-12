// Functions in Typescript ==>Function is all about a block of code or a collection of statements to complete a specific task. 

//There are mainly three different types of functions that will be used in JavaScript and TypeScript. 

//1. Named Function
//2. Anonymous Function
//3. Arrow Function


//1. Named Function 
//Named functions are nothing but the functions that are declared explicitly with some name. 

//Syntax of Named Function
// function functionName(parameters){
//     //function body
// }

function launchBrowserAndLogin(browserName: string, url: string): void {
    console.log(`Launch the ${browserName} Browser`);
    console.log(`Enter the URL: ${url}`);
    console.log("Enter the username as 'Bharath' and password as 'Bharath@123'");
    console.log("Click on the login button");
    console.log("Verify the home page is displayed");
}

//2. Arrow Function /Lambda Function

//Arrow functions are nothing but the function that we are going to write without any name and implementation Will be written by using arrow mark. 

//Syntax of Arrow Function
// let functionName = (parameters) => {
//     //function body
// }

//Regular function
function sum(a: number, b: number): number {
    let c:number =  a + b;
    return c;
}

//calling regular function
console.log(sum(10,20));

//Arrow function
let add = (a:number,b:number) => a+b;
let square = (a:number) => a*a;

//calling arrow function
console.log(add(10,20));
console.log(square(5));


//3. Anonymous Function

//Anonymous functions are the functions defined without any name. This anonymous function is regularly used as a parameter of other functions. 
//Syntax of Anonymous Function
// function(function){
//     //function body
// }

//function with paremeter as function
function mainFunction(  innerFunction: (a:number)=> number  ):void{
  console.log(innerFunction(6));
}


//calling function
 mainFunction( 
    function(a:number):number{
        return a * a;
    }
   );