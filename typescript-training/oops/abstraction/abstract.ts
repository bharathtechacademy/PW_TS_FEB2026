abstract class CommonMethods {

    launchApplication(){
        console.log("Launch the Browser");
        console.log("Enter the URL 'www.google.com'");
        console.log("Perform login operation");
    }

    // logoutFromApplication(){
    //     console.log("click on profile icon");
    //     console.log("click on logout button");
    //     console.log("Perform logout operation");
    // }

    // abstract launchApplication():void;

    abstract logoutFromApplication():void;
}

class Test extends CommonMethods{
    
    logoutFromApplication(): void {
        console.log("Click on profile icon");
        console.log("Click on logout button");
        console.log("Perform logout operation");
    }

    testcase1(){
        this.launchApplication();
        this.logoutFromApplication();
    }
}