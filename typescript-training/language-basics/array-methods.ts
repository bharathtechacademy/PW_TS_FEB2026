//Array : an array is a collection of multiple values. 

//1. Creating an array. 
console.log("1. Creating an array.")
let fruits :string [] = ["Apple","Banana","Cherry"];
let prices :number [] = [100, 20, 50, 10];
let fruitsAndPrices :(string |number) [] = ["Apple",100,"Banana",20,"Cherry",50];
console.log(fruits);
console.log(prices);
console.log(fruitsAndPrices);

//2. Access elements from the array
console.log("2. Access elements from the array")
console.log(fruits[1]);//banana
console.log(fruits.length);

//3. Adding additional values to the existing array at the end. 
console.log("3. Adding additional values to the existing array at the end. ")
fruits.push("Mango");
console.log(fruits);

//4. Remove the existing value from the array at the end. 
console.log("4. Remove the existing value from the array at the end.")
fruits.pop();
console.log(fruits);

//5. Add additional values to the existing array at the beginning. 
console.log("5. Add additional values to the existing array at the beginning. ")
fruits.unshift("Mango");
console.log(fruits);

//6. Remove the existing value from the array at the begining. 
console.log("6. Remove the existing value from the array at the begining.")
fruits.shift();
console.log(fruits);

//7. Add or remove one or more values within the array from specific index. (splice)
console.log("7.Add or remove one or more values within the array from specific index. ");
//splice(index,numberOfValuesToBeRemoved, valuesToBeAdded);)
fruits.splice(1,0,"Mango","Watermelon");
console.log(fruits);

//8. Creating a new array by extracting the portion of an existing array 
console.log("8. Creating a new array by extracting the portion of an existing array ");
//slice(startIndex,endIndex+1);
let extractedFruits :string [] = fruits.slice(1,4);
console.log(extractedFruits);

//9. Merge two or more arrays and create a new array. 
console.log("9. Merge two or more arrays and create a new array. ");
let vegetables :string [] = ["Tomato","Potato","Onion"];
let fruitsAndVegetables :string [] = fruits.concat(vegetables);
console.log(fruitsAndVegetables);

//10. Find the index of a specific value within the array. 
console.log("10. Find the index of a specific value within the array. ");
console.log(fruits.indexOf("Banana"));
console.log(fruits.indexOf("Guava"));//-1 means not found

//11. Iterate all the values of the array by using a for loop. 
console.log("11. Iterate all the values of the array by using a for loop. ");
for (let i = 0; i < fruits.length; i++) {
    console.log(fruits[i]);
}

for (let fruit of fruits) {
    console.log(fruit);
}

//12. Reverse the values within the array. 
console.log("12. Reverse the values within the array. ");
 prices.reverse();
console.log(prices);

//13. Sort the values within the array. 
console.log("13. Sort the values within the array. ");
prices.sort((a,b)=>a-b);//ascending order
console.log(prices);
prices.sort((a,b)=>b-a);//descending order
console.log(prices);