//Asynchronous function with promise that is returning either resolve(fulfil) or reject (unable to fulfil) the promise

//normal function to generate random number
function normalFunction(): number {
    return Math.random();
}

//async function to generate random number > 0.5 compulsary
function asyncFunctionWithPromise(): Promise<string> {
    return new Promise((resolve,reject)=>{
        const random = Math.random();
        if(random > 0.5){
            resolve(`Random number ${random} is greater than 0.5`);
        }else{
            reject(`Random number ${random} is less than or equal to 0.5`);
        }
    })
}

//Async function with timeout of 10 sec
function asyncFunctionWithPromiseAndTimeOut(): Promise<string> {
    return new Promise((resolve,reject)=>{
        const random = Math.random();

        //wait for 10 sec to resolve the promise
        setTimeout(()=>{ if(random > 0.5){
            resolve(`Random number ${random} is greater than 0.5`);
        }else{
            reject(`Random number ${random} is less than or equal to 0.5`);
        }},10000)
       
    })
}

//calling normal function
let value = normalFunction();
console.log(value);

//Calling async function
const result = await asyncFunctionWithPromise();
console.log(result);