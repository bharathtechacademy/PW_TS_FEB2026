// Types of variables in a class

//1. Local variable ==> The variable declared inside the method. This variable can be accessed only within the method. Outside of the method, not allowed. 
//2. Instance variable. ==> The variable declared outside of the method and inside the class. This variable can be accessed by creating the instance of the class or object of the class. 
//3. Static Variable ==> The variable declared outside of the method and inside the class along with the static keyword. This variable can be accessed by taking a reference to the class name. 

class Employee{

    empName:string = "Bharath Reddy"; //Instance Variable

    static empProject : string = "Creatio"; //static variable

     printEmpDetails():void {
        let empSalary : number = 100000;//Local Variable
        console.log("Employee Salary is :"+empSalary);
        console.log("Employee Name is :"+this.empName);
        console.log("Employee Project is :"+Employee.empProject);
    }

}

let obj = new Employee();
obj.printEmpDetails();

//access local variable
console.log(obj.empSalary);

//access instance variable
console.log(obj.empName);

//access static variable
console.log(Employee.empProject);