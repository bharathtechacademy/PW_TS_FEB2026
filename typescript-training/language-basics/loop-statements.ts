//Loop Statements ==> Loop the statements or execute the same statement multiple times. 

//Before Loop Statements
// let empName :string = "Bharath";
// console.log(empName);
// console.log(empName);
// console.log(empName);
// console.log(empName);
// console.log(empName);
// console.log(empName);
// console.log(empName);
// console.log(empName);
// console.log(empName);
// console.log(empName);

//After Loop Statements

//Loop statements are mainly two different categories. 

//1. for loop ==> When we know the total number of iterations to be executed before itself 
//2. while loop ==> When we don't know the total number of iterations to be executed before 

//1. for loop
//syntax:
// for(condition-to-start; condition-to-end; interval){
//statements
// }

let empName: string = "Bharath";
for (let i: number = 1; i <= 10; i++) {
    console.log(empName);
}

//2. while loop
//syntax:
// while(condition){
//statements
// }

let i:number = 1;
let isPageLoaded:boolean = false;

while(i>0){

    if(isPageLoaded || i==10){
        break;//break the loop
    }
    console.log("refresh the page");
    i++;
}

//special case of loops

//1.for...of loop ==> used to iterate the array elements
//2.for...in loop ==> used to iterate the object properties
//3.do...while loop ==> used to execute the statements at least once even the condition is false

//1.for...of loop
//syntax:
// for(variable of iterable){
//statements
// }

let fruits: string[] = ["apple", "mango", "grapes"];

//normal for loop
console.log("Executing the statements with regular for loop.");
for(let i:number = 0; i<fruits.length;i++){
    console.log(fruits[i]);
}

//for of loop
console.log("Executing the statements with for..of loop.");
for(let fruit of fruits){
    console.log(fruit);
}

//2.for...in loop
//syntax:
// for(variable in object){
//statements
// }
console.log("Executing the object values with for..in loop.");
interface personInfo {
    name: string,
    empId: number,
    visaStatus: boolean,
    address: {
        city: string,
        state: string,
        zip: number
    }
}

let person: personInfo = {
    name: "Bharath",
    empId: 1234,
    visaStatus: true,
    address: {
        city: "hyderabad",
        state: "TS",
        zip: 500081
    }
}

for(let key in person){
    console.log(key);//print key
    console.log(person[key as keyof personInfo]);//print value
}

for(let key in person.address){
    console.log(key);
}

//3.do...while loop
//syntax:
// do{
//statements
//}while(condition)

let x:number = 0;

console.log("do..while loop")
do{
    console.log("refresh the page");
    x++;
}while(x>0);