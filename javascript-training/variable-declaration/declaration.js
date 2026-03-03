//Variable declaration is all about declaring the nature of data while storing. 

//In JavaScript, we can declare the variables by using three different keywords. 

//1. var (avoided in modern JavaScript)
//2. let
//3. const

// These three different variable declarations will differ mainly based on four important parameters. 

//1. Initialization. 
//2. Reassignment 
//3. Re-declaration 
//4. Scope 



//1. Initialization ==> Initialization, meaning adding value at the time of declaration. 
const a = 10; // For constants, it's mandatory to initialize at the beginning. 
let b; // Can be initialized later 
var c; // Can be initialized later 

//2. Reassignment ==> Changing the value of a variable after it has been declared. 
// a = 20; //We cannot change the value of a variable declared with a constant declaration. 
b = 20;
c = 20;

//3. Re-declaration ==> Using the same variable to store different data, or redeclaring the variable to store different data 
// const a = "Bharath"; //You cannot re-declare if you are using a const declaration. 
// let b = "Reddy"; //You cannot re-declare if you are using a let declaration. 
var c = "Playwright"; //You can always re-declare if you are using var as your declaration. 
console.log(c);

//4. Scope ==> Scope is all about where can we use this data? 

{
    const x = 100;
    let y = 200;
    var z = 300;

    // console.log(x);
    // console.log(y);
    // console.log(z);
}

    //console.log(x); //Constant is block-scoped; you cannot access it outside of the block. 
    //console.log(y); //Let is block-scoped; you cannot access it outside of the block. 
    console.log(z);//Var is function-scoped; you can access it outside of the block.