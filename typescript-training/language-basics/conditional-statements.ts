//Conditional Statements ==> Statements (line of code) Along With Conditions 

//There are mainly two important conditional statements we have in TypeScript. 
//1.if-else statement ==> If-else conditional statements will be used when we don't know the result of the condition before itself. 
//2.Switch -case statement ==> Switch case statement will be used to choose one option among multiple. 


//if-else statement

//Syntax of if-else statement
// if (condition1) {

//          if(condition){

//          }else if(condition2){

//         }else{

//        }

// }else if(condition2){

//          if(condition){

//          }else if(condition2){

//         }else{

//        }

// }else if (condition3){

//          if(condition){

//          }else if(condition2){

//         }else{

//        }
// }else {
       //default block of code to execute when all the above conditions are false.
// }

//Example of if-else statement
let percentage : number = 92;

if(percentage >= 90){
    console.log("Grade A");

    if(percentage >= 95){
        console.log("Hey Buddy, You are eligible for gold medal. Congratulations!!!");
    }else{
        console.log("Hey Buddy, You are eligible for silver medal. Congratulations!!!");
    }

}else if(percentage >= 80){
    console.log("Grade B");
}else if(percentage >= 70){
    console.log("Grade C");
}else if(percentage >= 60){
    console.log("Grade D");
}else{
    console.log("Grade F");
}


//Switch-case statement

//Syntax of switch-case statement
// switch(value2){
//     case value1:
//         //block of code to be executed when the expression is equal to value1
//         break;
//     case value2:
//         //block of code to be executed when the expression is equal to value2
//         break;
//     case value3:
//         //block of code to be executed when the expression is equal to value3
//         break;
//     default:
//         //block of code to be executed when the expression doesn't match any of the cases
// }


//Example of switch-case statement
let env: string = "uat";

switch(env){
    case "dev":
        console.log("Execute the tests in development environment with dev.amzon.com");
        break; //break statement is used to exit the switch-case block after executing the code for the matched case. If we don't use break statement, the code will continue to execute the next cases until it finds a break statement or reaches the end of the switch-case block.
    case "qa":
        console.log("Execute the tests in staging environment with staging.amazon.com");
        break;
    case "prod":
        console.log("Execute the tests in production environment with amazon.com");
        break;
    default:
        console.log("Please provide the correct environment to execute the tests");
}