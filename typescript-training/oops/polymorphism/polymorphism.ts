
class Maths {

    // add(a: number, b: number): number {
    //     return a + b;
    // }

    // add(a: string, b: string): string {
    //     return a + b;
    // }

    //alternate method to achieve polymorphism in typescript
    add(a: any, b: any): any {
        return a + b;
    }


}


//Run-time polymorphism

class Parent{
    add(a: number, b: number): number {
        return a + b;
    }
}

class Child extends Parent{

    //overriding the add method of parent class
    add(a: number, b: number): number {
        return a + b +10;
    }
}

let obj = new Child();
console.log(obj.add(10, 20)); //40