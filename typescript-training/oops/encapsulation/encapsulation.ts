//Encapsulation : encapsulation is a concept of binding the data and methods together. 
//Encapsulation is a concept of hiding the information. By using encapsulation, we can share only required information with the required classes. 

//Main Class
class Person {
    public name: string = "Bharath Reddy";
    public city: string = "Hyderabad";
    private age: number = 0;


    //method to get the private data
    public getAge() {
        return this.age;
    }

    //method to set new value to private data
    public setAge(newAge: number) {
        this.age = newAge;
    }
}

//Ouside Class
class Outside {

    //method to access data outside of the class
    printEmpData() {
        console.log("accessing data with in the ouside class");
        let obj = new Person();
        console.log(obj.getAge());
    }
}


let obj3 = new Outside();
let obj1 = new Person();
obj1.setAge(35);
obj3.printEmpData();