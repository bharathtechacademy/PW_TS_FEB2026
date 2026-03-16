// A Prime number is a number greater than 1
// that is divisible only by 1 and itself.
// Prime numbers start from 2.
// Example: 2, 3, 5, 7, 11, ...

const input: number = 7; // input number to check for prime

let prime: boolean = true; // assume number is prime initially (by default )

// Check if the number is less than or equal to 1
// because prime numbers start from 2
if (input <= 1) {
    console.log(input+ " is not a prime number");
    prime = false; // set prime to false for 0 or 1 or negative numbers
}

// Loop from 2 to input-1 to check if any number divides 'input'
for (let i: number = 2; i < input; i++) {
    if (input % i === 0) {
        // Found a divisor other than 1 and itself
        prime = false;
        break; // optional optimization
    }
}

// Final decision after checking all possible divisors
if (prime) {
    console.log(input+ " is a prime number");
} else {
    console.log(input+ " is not a prime number");
}

export {};