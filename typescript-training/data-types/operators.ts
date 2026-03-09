//Operators: Operators are nothing but the special characters used in the programming language to perform operations.

//There are mainly five different types of operators available in TypeScript. 

//1. Arithmetic operators ==> The operators used in mathematical operations (+,-,*,/,%,++,--)
//2. Assignment operators ==> The operators used to assign a value to the variable (=,+=,-=,*=,/=,%=)
//3. Comparison operators ==> The operators used to compare two different values. (==,===. !=, >, <, >=, <=)
//4. Logical operators ==> The operators used to build logics by combining multiple conditions. (&&, ||, !)
//5. Ternary operator ==> The operator used to perform conditional operations (?)

//1. Arithmetic operators ==> The operators used in mathematical operations (+,-,*,/,%,++,--)
//+ addition
//- Subtraction. 
//* Multiplication 
/// division. 
//% Modulus (Reminder)
//++ Increment (adds 1 to the variable)
//-- Decrement (subtracts 1 from the variable)
let a: number = 10;
let b: number = 20;
console.log("Addition: " + (a + b)); //30
console.log("Subtraction: " + (a - b)); //-10
console.log("Multiplication: " + (a * b)); //200
console.log("Division: " + (a / b));//0.5
console.log("Modulus: " + (a % b)); //10


//++a ==> pre-increment (increase the value first and execute line) , a++ ==> post-increment (execute the line with old value,then increase by 1)
console.log(++a);//pre
console.log(a);
console.log(b++);//post
console.log(b);

//--a ==> pre-decrement (Decrease the value first and execute the line. ) , a-- ==> Post decrement (Execute the line with old value, then decrease  by 1. )
console.log(--a); //pre
console.log(a);
console.log(b--);//post
console.log(b);