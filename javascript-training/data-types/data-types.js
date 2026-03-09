//Data types in JavaScript

//1.Primitive Data Types (Immutable)
//2. Non-Primitive Data Types (Mutable)

//immutable
let a=10;
a+10;
console.log(a);

//mutable
let obj = {
    "name":"bharath",
    "id":1234
}
obj.age =34;
console.log(obj);


//Data types in JavaScript 

/********************************************/
/**********Primitive Datatypes***************/
/********************************************/

//number,string, boolean,undefined, null and symbol

//1. number ==> The data type to store numbers with decimals, without decimals, without using any quotations 
let num1 =10;
let num2 =12.23187;
console.log(typeof num1);
console.log(typeof num2);

//2. string ==> The data type to store text values or a collection of characters together within the quotations (single, double quotes or backticks)
let empName = 'Bharath';
let location = "Hyde'r'abad";
let company = `Microsoft`;
console.log(typeof empName);
console.log(typeof location);
console.log(typeof company);

console.log("Emp Name is "+empName+ " Emp location is "+location);
console.log (`Emp name is ${empName} and Emp Location is ${location}`);

//3. boolean ==> The data type to store true or false values
let x = 10;
let y = 20;
let z = x > y;
console.log(typeof z);

//4. undefined ==> undefined represents a variable that has been declared but not assigned any value. 
let age;
console.log(age);

//5. null ==> Null represents a variable that has been declared and assigned a null or empty value. 
let salary = 100000;
salary = null;
console.log(salary);

//6. Symbol ==> Symbol represents a unique hidden identifier. 
let countryOfOrigin = Symbol();
let productInfo = {
    productName : "One Plus 17",
    [Symbol("price")] : 90000,
    [countryOfOrigin] : "China"
}

console.log(productInfo);

/********************************************/
/**********Non-primitive Datatypes***********/
/********************************************/

//1.object ==> Object data type represents a collection of key-value pairs within the curly braces. 
let person = {
    name: "Bharath",
    empId:1234,
    visaStatus: true,
    address: {
        city :"hyderabad",
        state:"TS",
        zip:500081
    }
}

person.salary = 100000;

//print the data
console.log(person.name);
console.log(person.address.city);

console.log(person["name"]);
console.log(person.address["city"]);

console.log(person);

//2. array ==> Array represents a list of values. 
let fruits = ["apple","mango","grapes"];
let prices = [100,150,180];
let fruitsAndPrices = ["apple",100,"mango",150,"grapes",180];
console.log(fruits);
console.log(prices);
console.log(fruitsAndPrices);
console.log(fruits[1]);
console.log(fruitsAndPrices[3]);

//3.function ==> Function represents a block of code or collection of statements written together to complete a particular task. 
function launchBrowserAndLogin(browserName) {
    console.log(`Launch the ${browserName} Browser`);
    console.log("Enter the URL: https://www.qa.icici.com/");
    console.log("Enter the username as 'Bharath' and password as 'Bharath@123'");
    console.log("Click on the login button");
    console.log("Verify the home page is displayed");
}

function logoutAndCloseBrowser() {
    console.log("Logout from the application");
    console.log("Close the browser");
}

function getBalance() {
    console.log("Navigate to the account balance page");
    let accountBalance = 100000;
    return accountBalance;
}

//4. Set ==> Set represents a collection of unique values.
let empIds = new Set();
empIds.add(1234);
empIds.add(5678);
empIds.add(1234);//duplicate value will not be added to the set
console.log(empIds);

//5. Map ==> Map represents a collection of key-value pairs. (Map won't allow duplicate keys, but always duplicate values are allowed. )
let empData = new Map();
empData.set(123,"Bharath");
empData.set(124,"Sarath");
empData.set(123,"Hemanth");
empData.set(126,"Sarath");
empData.delete(126);
console.log(empData.get(123));
console.log(empData.size);
console.log(empData);

//6. Date ==> Date represents a specific point in time.
let currentDate = new Date();
console.log(currentDate);

//get the current year
console.log(currentDate.getFullYear());

//get the current month
console.log(currentDate.getMonth()+1); //month values are from 0 to 11, so we need to add 1 to get the correct month number

//get the current date
console.log(currentDate.getDate());

// get the current day of the week
console.log(currentDate.getDay()); //day values are from 0 to 6, where 0 represents Sunday and 6 represents Saturday

//get the current hours
console.log(currentDate.getHours());

//get the current minutes
console.log(currentDate.getMinutes());

//get the current seconds
console.log(currentDate.getSeconds());