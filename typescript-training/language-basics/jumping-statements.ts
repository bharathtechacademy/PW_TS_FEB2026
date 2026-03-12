//Jumping Statements

//Jumping statements are used to jump the control from one point to another point in the program.
//There are mainly two jumping statements used in loops. 

//1.break ==>break statement will break the entire loop. 
//2.continue ==> continue statement will skip the current iteration only. 

for(let i:number = 1; i<=10; i++){
    if(i==5){
        //break;//break the entire loop
        continue;//skip current iteration and move to next iteration
    }
    console.log(i);
}