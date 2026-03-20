//Inheritance:

//grand-parent class
class Class1{
    empName:string ="Bharath Reddy";
    empId:number = 1234
}

//parent class
class Class2 extends Class1{
    empSalary:number = 50000;
}

//child class
class Class3 extends Class2{
    empProject:string = "Creatio CRM";
}

let emp = new Class3();
console.log(emp.empSalary);
console.log(emp.empName);
console.log(emp.empId);
console.log(emp.empProject);