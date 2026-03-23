// Base value (x) and exponent (n) are initialized
let x: number = 10;   // Base number
let n: number = 2;    // Exponent (can be positive, negative, or zero)

//start with default result of 1
let result: number = 1; // Variable to store the final result of x^n

// Case when exponent is 0: x^0 is always 1
if (n === 0) {
    result = 1;
}

//2^-2 ==1/2^2 == 1/2 * 1/2 == 1/4

// Case when exponent is negative:
// Convert the base to its reciprocal and make the exponent positive
if (n < 0) {
    x = 1 / x;   // Inverse the base
    n = -n;      // Make exponent positive
}

// Multiply the base 'x' with itself 'n' times
for (let i: number = 0; i < n; i++) {
    result = result * x;
}

// Print the final result of x raised to the power n
console.log(result);

export {};
