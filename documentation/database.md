# What is a database? 
Database is an organized collection of data that is going to allow us to access, review, and update a particular piece of information in a rapid and coherent manner. 

## Database components ?
There are mainly five important components that will be there in the database. 
- Hardware (Storage Devices and Input/Output Devices )
- Software (Like SQL Server, PostgreSQL Server and additional DB software to set up the templates to store the data )
- Data - The piece of information that you want to store 
- Procedures - Set of rules and regulations that we are going to impose on the table columns To avoid the invalid data 
- DBA Language - The language that we are going to use to communicate with our database (SQL)

## What is our RDBMS?  
RDBMS stands for Relational Database Management System. Mainly, this RDBMS is going to talk about maintaining the data in multiple tables instead of storing it in one single table. 

## What is SQL?
SQL Mint for Structured Query Language. SQL is used to communicate with our database to collect the data. Most of the commands that we are going to write are in the form of a query, and that too is very similar to plain English language. By using SQL, we can perform CRUD operations in the database. 

## CRUD operations?
Create => CREATE, INSERT
Read => SELECT
Update => UPDATE, ALTER
Delete => DROP, DELETE

# Datatypes in SQL ?

## Syntax to add Columns:  ColumnName DataType Constraint

## Numeric Data Types. 
SMALLINT => 2 bytes => It can store numbers without decimals from -32768 to +32767. 
INTEGER => 4 bytes => It can store numbers without decimals from -2147483648 to +2147483647
BIGINT => 8 bytes => It can store the number up to 19 digits. 

FLOAT => Float can store numbers with decimals up to 6 decimal points. 
DOUBLE => Double can store up to 15 decimal points. 
DECIMAL => Decimal can store up to 16k plus decimal points. 

SMALLSERIAL => It can store only positive integers from 1 to 32,767. 
SERIAL  => It can store only positive integers from 1 to 2147483647
BIGSERIAL => It can store only positive numbers from 1 to a  19 digit number. 

## Character Data Types 
CHAR(n) => CHAR(n) Datatype is going to allow us to store a fixed number of characters. 
VARCHAR(n) => VARCHAR(n) Datatype is going to allow us to store a variable number of characters. 
TEXT => Text data type is going to allow us to store an unlimited number of characters. 

## Boolean data type. 
BOOLEAN => The Datatype that can help us to store the values in the form of true or false 

## Date and Time Datatypes
DATE => Date Datatype can store only date. 
TIME => Time Datatype can store only time. 
TIMESTAMP => Timestamp data type can store date and time together. 
INTERVAL => Interval data type can store the period in minutes, hours, days, months, and years. 

# Operators in SQL ?

## Arithetic Operators
Arithmetic operators are nothing but the operators used in the mathematical operations. 
+ For addition 
- for subtraction. 
* Asterisk for multiplication. 
/ for division 
% Percentile for Modulus 

## Comparison Operators 
Comparison operators are nothing but the operators that we are going to use to compare two different values. 
- = is equal to
- != not equal to
- > greater than
- < less than
- >= greater than or equal to
- <= less than or equal to

## Logical Operators 
AND => Combines two or more conditions and is returns true only if all conditions are satisfied. 
OR => Combines two or more conditions and is returns true if at least one of the conditions is satisfied. 
NOT => Opposite result
BETWEEN => Filter the rows within a specific range. 
IN => Filter the rows based on the list of specific values. 
LIKE => Filter the rows based on the pattern matching with % percentile and _ undersquare. 
IS NULL => Filters the rows where the column contains a null value. 
EXISTS => Check if subquery returns any rows. Based on that, we want to filter the records from the main table. 

## Constraints in SQL 
Constraints are all about conditions added on top of the database columns. 
NOT NULL => The column having a NOT NULL constraint won't allow null values. 
UNIQUE => The column having a UNIQUE constraint won't allow duplicate values. 
PRIMARY KEY => Primary Key Constraint is a combination of UNIQUE + NOT NULL, and it will be used to uniquely identify each record in the table. 
FOREIGN KEY => This constraint creates a link between two different tables, ensuring referential integrity. 
CHECK => This constraint is going to help us to add custom conditions. 
DEFAULT => Default constraint will be helping us to store a default value when the user has not entered any value while storing the data. 

# SQL Functions
The default methods available in SQL to perform different types of operations and manipulations on top of the data that we have stored previously within the database 

## Aggregate functions 
Aggregate functions are all about the functions designed to perform calculations on a set of rows and return a single result. 

COUNT() => SELECT COUNT(*) FRPM EMPLOYEE => It will return the total number of rows available in the table. 
SUM() =>SELECT SUM(SALARY) FRPM EMPLOYEE => It will return the sum of all the values stored in a particular column. 
AVG() =>SELECT AVG(SALARY) FRPM EMPLOYEE => It will return the average value of all the values stored in the particular column. 
MIN()=>SELECT MIN(SALARY) FRPM EMPLOYEE =>it will return the minimum value of all the values stored in the particular column. 
MAX()=>SELECT MAX(SALARY) FRPM EMPLOYEE =>it will return the maximum value of all the values stored in the particular column.

## String functions. 
String functions in PostgreSQL are used to manipulate and transform the text or character data types. This is going to allow the user to format or extract or combine multiple string values together. 

LENGTH() => It will return the total number of characters available in the string. 
UPPER() => It will Convert all the characters of the string into uppercase and return the value. 
LOWER() => It will Convert all the characters of the string into lowercase and return the value. 
SUBSTRING(NAME FROM 1 TO 3) => Substring function will extract the part of the string from the character datatype. 
TRIM() => trim function removes leading and trailing spaces from the string. 
CONCAT() => The `concat` function joins two or more strings together. 

## Numerical Functions
Numerical functions in SQL are used to perform mathematical operations and transform numeric data into multiple formats. 

ABS() => Returns the absolute value of number. => SELECT ABS (-123.75) => 123.75
CEIL() => Returns the ceiling value, meaning the nearest next integer => CEIL(123.45) => 124
FLOOR() => Returns the floor value, meaning the nearest previous integer => FLOOR(123.45) => 123
ROUND() => Round off the number to the nearest integer or specific number of decimal places. 
POWER() => It will return the power of so and so number. => POWER (2,3) = 8
SQRT() => It will return the square root of the number. => SQRT(4) =2