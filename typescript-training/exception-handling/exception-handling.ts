//Exception handling ==> Handle the exceptions. 

//try..catch..finally ==> When there is an exception and if you want to handle the exception and continue the execution process 
//throw ==> When there is no exception, but the user intentionally wants to fail the program by throwing an exception 

let input:any;

// console.log(input.toLowerCase());
// console.log("Execution is completed...!")

try{
   console.log(input.toLowerCase()); //Plan A
}catch(error){
    console.log("I guess there is a problem in the 'input.toLowerCase()' method ") 
     console.log(input.toUpperCase()); //plan B
}finally{
    console.log("Execution is completed...!");//mandatory block to be executed whether there is an exception or not.
}

