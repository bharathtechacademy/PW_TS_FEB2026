//Class with multiple methods related to employee 
class Employee {

    constructor(){
        
    }

    //method 1
    printEmployeeDetails(empId: number, empName: string) {
        console.log("Employee Id: " + empId);
        console.log("Employee Name: " + empName);
    }

    //method 2
    printEmployeeProjects(empId: number, empProject: string) {
        console.log("Employee Id: " + empId);
        console.log("Employee Projects: " + empProject);
    }

    //method 3
    printEmployeeRole(empId: number, empRole: string) {
        console.log("Employee Id: " + empId);
        console.log("Employee Role: " + empRole);
    }
}

//Access the methods by creating an object of the Employee class. 
let emp = new Employee();

//calling method 1
emp.printEmployeeDetails(1234,"Bharath Reddy");

//calling method 2
emp.printEmployeeProjects(1234, "Creatio CRM");

//calling method 3
emp.printEmployeeRole(1234, "Sr SDET");