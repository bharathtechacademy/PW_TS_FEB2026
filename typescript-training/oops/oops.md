# OOPS Concepts

1. classes
2. objects
3. constructors
4. inheritance
5. polymorphism
6. abstraction
7. encapsulation
8. static members
9. access modifiers
10. interfaces
11. abstract classes
12. this & super keywords



## class 
Class is a datatype/template ,that is going to provide a more structured and systematic way to define all the data, methods, and objects together at one place. 

## Object 
Object is nothing but a new instance of the class. (It is aerox copy of the original class.)
Syntax of Object : new Class();

## Constructor 
Constructor is a default method created by TypeScript every time we are going to create a new class that is going to initialize all the properties of the class when we are going to create an object. 

## Inheritance 
Inheritance is a concept of extending parent class properties into child class without creating any object. 

1. Single inheritance ==> Class2 extends Class1
2. Multi-level inheritance ==> Class2 extends Class1 , Class3 extends Class2
3. Hierarchical Inheritance ==> Class2 extends Class1 , Class3 extends Class1
4. Multiple Inheritance (this is not supported in TypeScript normal classes, but we can achieve the same using interfaces.) ==> Class3 extends Class1, Class2

## this & super
'this' refers to the current class instance. 
'super' refers to the superclass or parent class instance. 