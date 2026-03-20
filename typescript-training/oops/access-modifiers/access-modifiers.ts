//Access Modifiers in TypeScript

//1. public /no keyword ==> We can access from everywhere. 
//2. Protected ==> Can be accessed either within the class or its subclass only 
//3. Private ==> Can be accessed within the class only 

let a: number = 10; //public by default

//Main Class
class Person {
   public name: string = "Bharath Reddy";
   public age: number = 35;
   public city: string = "Hyderabad";

    //method to access data with in the class
    printEmpData() {
        console.log("accessing data with in the class");
        console.log(this.name);
        console.log(this.age);
        console.log(this.city);
        console.log(a);
    }

    //method to get the private data
    public getAge(){
        return this.age;
    }

    //method to set new value to private data
    public setAge(newAge:number){
        this.age = newAge;
    }
}

//Child Class
class Child extends Person {

    //method to access data with in the child class
    printEmpData() {
        console.log("accessing data with in the child class");
        console.log(this.name);
        console.log(this.getAge());
        console.log(this.city);
    }
}

//Ouside Class
class Outside {

    //method to access data outside of the class
    printEmpData() {
        console.log("accessing data with in the ouside class");
        let obj = new Person();
        console.log(obj.name);
        console.log(obj.age);
        console.log(obj.city);
    }
}

let obj1 = new Person();
obj1.printEmpData();
let obj2 = new Child();
obj2.printEmpData();
let obj3 = new Outside();
obj3.printEmpData();