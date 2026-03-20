//Class with multiple methods related to employee 
class Employee {

    //declare variable to store common parameters
    empId: number;

    //constructor method to update empid
    constructor(id: number) {
        this.empId = id
    }

    //method 1
    printEmployeeDetails(empName: string) {
        console.log("Employee Id: " + this.empId);
        console.log("Employee Name: " + empName);
    }

    //method 2
    printEmployeeProjects(empProject: string) {
        console.log("Employee Id: " + this.empId);
        console.log("Employee Projects: " + empProject);
    }

    //method 3
    printEmployeeRole(empRole: string) {
        console.log("Employee Id: " + this.empId);
        console.log("Employee Role: " + empRole);
    }
}

//Access the methods by creating an object of the Employee class. 
let emp = new Employee(1234);

//calling method 1
emp.printEmployeeDetails("Bharath Reddy");

//calling method 2
emp.printEmployeeProjects("Creatio CRM");

//calling method 3
emp.printEmployeeRole("Sr SDET");