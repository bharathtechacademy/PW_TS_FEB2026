//function to get sumOfUnlimited numbers based on input from 1 to till input number
function sumOfNumbers(input: number): number {
    let sum = 0;
    for (let i = 1; i <= input; i++) {
        sum += i;
    }
    return sum;
}

//Normal Function flow
// console.log("Start of the program");
// console.log("Step 1 Executed");
// console.log("Step 2 Executed");
// let result = sumOfNumbers(10000000000);
// console.log("Step 3 Executed and the result is: " + result);
// console.log("Step 4 Executed");
// console.log("Step 5 Executed");
// console.log("End of the program");

//callback function to display the result
console.log("Start of the program");
console.log("Step 1 Executed");
console.log("Step 2 Executed");
setTimeout(():void=>{
    let result = sumOfNumbers(10000000000);
    console.log("Step 3 Executed and the result is: " + result);
},3000);
console.log("Step 4 Executed");
console.log("Step 5 Executed");
console.log("End of the program");