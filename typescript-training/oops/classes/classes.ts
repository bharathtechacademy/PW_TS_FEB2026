//create employee class
class Employee {

    empId : number = 1234;
    empName : string = "John Doe";

    //store const variables in a class


    empProjectDetails():void{      
        console.log("Employee is working on TypeScript Training");
    }

}

//Access the data from the class by creating an object. 
let obj = new Employee();
console.log(obj.empId);
console.log(obj.empName);
obj.empProjectDetails();

