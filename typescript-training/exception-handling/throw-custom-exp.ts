let age:number = 17;

if(age < 18){
    throw new Error("You are not eligible to vote...");
}else{
    console.log("You are eligible to vote...");
}

console.log("Execution is completed...!");