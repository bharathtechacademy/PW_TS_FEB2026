//string: String is nothing but a collection of characters. In TypeScript, we can use single quotes (' '), double quotes (" "), or backticks (` `) to define a string.

//Example of string declaration
let firstName: string = "John";
let lastName: string = 'Doe';
let fullName: string = `${firstName} ${lastName}`; // Using template literals
console.log(fullName); // Output: John Doe

/***************************String Methods ***************************/
//1.Storing string in a variable
console.log("1.Storing string in a variable");
let originalString: string = " Username : Admin | Password : admin123 ";
console.log(originalString); // Output:  Username : Admin | Password : admin123

//2. Calculate the total number of characters available in the string. ==> string.length
console.log("2. Calculate the total number of characters available in the string.")
let stringLength :number = originalString.length;
console.log("Total Chars in String are "+stringLength);

//3. Get the specific character from the string at a specific index. ==> string.charAt(index);
console.log("3. Get the specific character from the string at a specific index.");
let charAtIndex5 = originalString.charAt(5);
console.log("Char available at index 5 is : "+charAtIndex5);

//reverse the string 
let reverseString:string = "";
for(let i:number =stringLength-1 ;i>=0 ; i--){
reverseString = reverseString+originalString.charAt(i);
}
console.log("Reversed String is : '"+reverseString+"'");

//4.Removing unwanted spaces from the string  ==> string.trim();
console.log("4.Removing unwanted spaces from the string");
let trimmedString:string = originalString.trim();
console.log("Trimmed String is : '"+trimmedString+"'");

//5.Removing all the spaces from the string  ==> string.replace(/\s/g, '');
console.log("5.Removing all the spaces from the string");
let stringWithoutSpaces:string = originalString.replace(/ /g, '');
console.log("String without spaces is : '"+stringWithoutSpaces+"'");

//6.Removing all the numbers from the string  ==> string.replace(/[exp]/g, '');
console.log("6.Removing all the numbers from the string");
let stringWithoutNumbers:string = originalString.replace(/[0-9]/g, '');
console.log("String without numbers is : '"+stringWithoutNumbers+"'");

//7.Removing all the alphabets from the string  ==> string.replace(/[exp]/g, '');
console.log("7.Removing all the alphabets from the string");
let stringWithoutAlphabets:string = originalString.replace(/[a-zA-Z]/g, '');
console.log("String without alphabets is : '"+stringWithoutAlphabets+"'");

//8.Removing all the special chars from the string  ==> string.replace(/[exp]/g, '');
console.log("8.Removing all the special chars from the string");
let stringWithoutSpecialChars:string = originalString.replace(/[^0-9a-zA-Z]/g, '');
console.log("String without special chars is : '"+stringWithoutSpecialChars+"'");

//9. Convert the string into uppercase  ==> string.toUpperCase();
console.log("9. Convert the string into uppercase");
let upperCaseString:string = originalString.toUpperCase();
console.log("Uppercase String is : '"+upperCaseString+"'");

//10. Convert the string into lowercase  ==> string.toLowerCase();
console.log("10. Convert the string into lowercase");
let lowerCaseString:string = originalString.toLowerCase();
console.log("Lowercase String is : '"+lowerCaseString+"'");

//11. Extract specific part of the string by using starting and ending indexes. ==> string.substring(startIndex, endIndex);
console.log("11. Extract specific part of the string by using starting and ending indexes.");
let username:string = originalString.substring(12, 17);
let password:string = originalString.substring(31, 39);
console.log("Extracted Username is : '"+username+"'");
console.log("Extracted Password is : '"+password+"'");

//12.Extract the specific part of the string from dynamic text using the split method. ==> string.split(referenceChar);
console.log("12. Extract the specific part of the string from dynamic text using the split method.");
let parts:string[] = originalString.split(" ");
console.log(parts);
console.log("Extracted Username is : '"+parts[3]+"'");
console.log("Extracted Password is : '"+parts[7]+"'");

//13. Compare two different strings. 
//== (loose equality)==> compares the values of the strings and returns true if they are equal, otherwise false.
//=== (strict equality)==> compares both the values and the types of the strings and returns true if they are equal, otherwise false.
//includes() method is used to check if a string contains a specific substring. It returns true if the substring is found, otherwise false.
//startsWith() method is used to check if a string starts with a specific substring. It returns true if the string starts with the substring, otherwise false.
//endsWith() method is used to check if a string ends with a specific substring. It returns true if the string ends with the substring, otherwise false.
console.log("13. Compare two different strings.");
let string1:string = "100";
let number1:number = 100;
// console.log(string1 == number1); // Output: true (loose equality)
// console.log(string1 === number1); // Output: false (strict equality)
let string2:string = "Hello World";
console.log(string2.includes("ello")); // Output: true
console.log(string2.startsWith("Hello")); // Output: true
console.log(string2.endsWith("World")); // Output: true


//14. Data type conversion: Converting a string to a number and vice versa.
console.log("14. Data type conversion: Converting a string to a number and vice versa.");

//Convert other data type to string. 
let stdCode:number = 144 ;
let ph:number = 234567;
let StdCode:string = String(stdCode);
console.log(StdCode+ph);

//Convert string to other datatypes
let balance:string ="Account balance is 19,999.99 rupees";
balance = balance.replace(/[^0-9.]/g, ''); // Remove non-numeric characters except the decimal point
let balanceNumber:number = parseFloat(balance); //parseInt() , parseFloat(), parseBool() are used to convert string to number and boolean respectively.
console.log(balanceNumber>=10000);