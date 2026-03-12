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

//2. Assignment operators ==> The operators used to assign a value to the variable (=,+=,-=,*=,/=,%=)
// = simple assignment operator (assigns the value on the right to the variable on the left)
// += addition assignment operator (x+=10 is equivalent to x = x + 10)
// -= subtraction assignment operator (x-=10 is equivalent to x = x - 10)
// *= multiplication assignment operator (x*=10 is equivalent to x = x * 10)
// /= division assignment operator (x/=10 is equivalent to x = x / 10)
// %= modulus assignment operator (x%=10 is equivalent to x = x % 10)

let c: number = 10;
console.log("Simple assignment: " + c); //10
c+=10; //c=c+10;
console.log("Addition assignment: " + c); //20
c-=5; //c=c-5;
console.log("Subtraction assignment: " + c); //15
c*=2; //c=c*2;
console.log("Multiplication assignment: " + c); //30
c/=3; //c=c/3;
console.log("Division assignment: " + c); //10
c%=3; //c=c%3;
console.log("Modulus assignment: " + c); //1

//3. Comparison operators ==> The operators used to compare two different values. (==,===. !=, >, <, >=, <=)
//== Equality operator (compares the values of two operands, returns true if they are equal, false otherwise)
//=== Strict equality operator (compares both the value and the type of two operands, returns true if they are equal, false otherwise)
//!= Inequality operator (compares the values of two operands, returns true if they are not equal, false otherwise)
//> Greater than operator (returns true if the left operand is greater than the right operand, false otherwise)
//< Less than operator (returns true if the left operand is less than the right operand, false otherwise)
//>= Greater than or equal to operator (returns true if the left operand is greater than or equal to the right operand, false otherwise)
//<= Less than or equal to operator (returns true if the left operand is less than or equal to the right operand, false otherwise)

let x:number = 10;
let y:number = 20;
let z:any = "10";

console.log("Equality operator: " + (x == z)); //true (compares only values)
console.log("Strict equality operator: " + (x === z)); //false (compares both value and type)
console.log("Inequality operator: " + (x != y)); //true (compares only values)
console.log("Greater than operator: " + (x > y)); //false
console.log("Less than operator: " + (x < y)); //true
console.log("Greater than or equal to operator: " + (x >= y)); //false
console.log("Less than or equal to operator: " + (x <= y)); //true

//4. Logical operators ==> The operators used to build logics by combining multiple conditions. (&&, ||, !)
//&& Logical AND operator (returns true if both operands are true, false otherwise)
//|| Logical OR operator (returns true if at least one operand is true, false otherwise)
//! Logical NOT operator (returns true if the operand is false, and false if the operand is true)
let i:number = 10;
let j:number = 20;
let k:number = 30;

console.log("Logical AND operator: " + (i < j && j < k)); //true and true = true
console.log("Logical OR operator: " + (i < j || j > k)); //true or false = true
console.log("Logical NOT operator: " + !(i < j)); //not true = false

//5. Ternary operator ==> The operator used to perform conditional operations (?)
//Syntax: condition ? expression1 : expression2
//If the condition is true, expression1 is evaluated and returned; otherwise, expression2 is evaluated and returned.
let age:number = 18;
let eligibility:string = age >= 18 ? "Eligible to vote" : "Not eligible to vote";
console.log("Ternary operator: " + eligibility); //Eligible to vote

let num1:number = 5;
let num2:number = 10;
let max:number = num1 > num2 ? num1 : num2;
console.log("Maximum number: " + max); //10