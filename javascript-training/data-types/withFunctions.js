// Test Case 1: verify the home page.
console.log("******************TEST CASE 1: VERIFY THE HOME PAGE******************");
launchBrowserAndLogin("Chrome","https://www.qa.icici.com/");
logoutAndCloseBrowser()

// Test Case 2: verify the account balance
console.log("******************TEST CASE 2: VERIFY THE ACCOUNT BALANCE******************");
launchBrowserAndLogin("Edge","https://www.qa.icici.com/");
getBalance();
console.log("Verify the account balance is displayed as " + getBalance());
logoutAndCloseBrowser()

// Test Case 3: verify the account statement
console.log("******************TEST CASE 3: VERIFY THE ACCOUNT STATEMENT******************");
launchBrowserAndLogin("Firefox","https://www.qa.icici.com/");
console.log("Navigate to the account statement page");
console.log("Verify the account statement is displayed with the following details:");
logoutAndCloseBrowser()


function launchBrowserAndLogin(browserName,url) {
    console.log(`Launch the ${browserName} Browser`);
    console.log(`Enter the URL: ${url}`);
    console.log("Enter the username as 'Bharath' and password as 'Bharath@123'");
    console.log("Click on the login button");
    console.log("Verify the home page is displayed");
}

function logoutAndCloseBrowser() {
    console.log("Logout from the application");
    console.log("Close the browser");
}

function getBalance() {
    console.log("Navigate to the account balance page");
    let accountBalance = 100000;
    return accountBalance;
}