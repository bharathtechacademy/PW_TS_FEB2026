// Assignment7_ConditionalStatements.ts

function evaluateLoan(
    customerName: string,
    creditScore: number,
    income: number,
    isEmployed: boolean,
    debtToIncomeRatio: number
): void {

    // Display initial message
    console.log("Loan Evaluation Result for: " + customerName);

    // Step 1: Check credit score
    if (creditScore > 750) {
        // If credit score is above 750, the loan is automatically approved
        console.log("Loan Approved: Excellent credit score.");
    } else if (creditScore >= 650) {
        // If credit score is between 650 and 750, further checks are needed
        // Step 2: Check income
        if (income >= 50000) {
            // If income is at least $50,000, check employment status
            if (isEmployed) {
                // Step 3: Check debt-to-income ratio
                if (debtToIncomeRatio < 40.0) {
                    // If DTI ratio is less than 40%, approve the loan
                    console.log("Loan Approved: Meets all criteria.");
                } else {
                    // If DTI is 40% or greater, deny the loan
                    console.log("Loan Denied: Debt-to-Income ratio is too high.");
                }
            } else {
                // If the customer is unemployed, deny the loan
                console.log("Loan Denied: Customer is not employed.");
            }
        } else {
            // If income is less than $50,000, deny the loan
            console.log("Loan Denied: Income is less than required.");
        }
    } else {
        // If credit score is below 650, deny the loan
        console.log("Loan Denied: Credit score is too low.");
    }
    
    
}


evaluateLoan(
    "John Doe",   // customerName
    720,          // creditScore
    55000.0,      // income
    true,         // isEmployed
    45.0          // debtToIncomeRatio
);

export {};