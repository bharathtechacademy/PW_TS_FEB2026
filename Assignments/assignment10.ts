// Array representing the stock prices over different days
// Each element corresponds to the price of the stock on that day
const prices: number[] = [7, 1, 5, 3, 6, 4]; //Array

// Variable to store the maximum profit observed so far
let maxProfit: number = 0;

// Variables to store the best day to buy and sell the stock (1-based index)
let buyDay: number = 0;
let sellDay: number = 0;

// Outer loop: pick each day as a potential buying day
for (let i: number = 0; i < prices.length - 1; i++) {

    // Inner loop: pick each subsequent day as a potential selling day
    for (let j: number = i + 1; j < prices.length; j++) {

        // Calculate the profit if we buy on day i and sell on day j
        const profit: number = prices[j] - prices[i];

        // If this profit is greater than the current maximum profit
        if (profit > maxProfit) {

            // Update maxProfit with the new higher profit
            maxProfit = profit;

            // Update buyDay and sellDay (convert to 1-based index)
            buyDay = i + 1;
            sellDay = j + 1;
        }
    }
}

// Print result
if (maxProfit > 0) {
    console.log("Max Profit is " + maxProfit);
    console.log("Buy the share on day " + buyDay);
    console.log("Sell the share on day " + sellDay);
} else {
    console.log("You will lose your money, don't buy this share");
}

export {};