//interace 

interface Application1 {

    loginintoApplication(): void;

    logOutFromApplication(): void;

}

interface Application2 {

    verifyHomePage(): void;

    verifyDashboard(): void;

}

class Test implements Application1, Application2 {
    verifyHomePage(): void {
        console.log("Verifying home page loaded successfully");
    }

    verifyDashboard(): void {
        console.log("Verifying dashboard is accessible");
    }

    loginintoApplication(): void {
        console.log("Logging into the application");
    }

    logOutFromApplication(): void {
        console.log("Logging out from the application");
    }
}