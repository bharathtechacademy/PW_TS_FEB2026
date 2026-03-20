class Parent {
    //Parent Class Value
    course: string = "JavaScript";

    printProject() {
        console.log("ABC Project");
    }
}

class Child extends Parent {
    //Child Class value
    course: string = "TypeScript";

  printProject() {
        console.log("XYZ Project");
    }

    //Method Level
    printCourse(course: string) {
        console.log("Course Name :" + course);
        // console.log("Course Name :" + new Child().course);
        // console.log("Course Name :" + new Parent().course);
        // console.log("Course Name :" + this.course);
        // console.log("Course Name :" + super.course);
        this.printProject();
        super.printProject();
    }

}

let obj = new Child();
obj.printCourse("Playwright");