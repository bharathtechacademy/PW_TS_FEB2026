let n: number = 5; // Number of rows in the top half of the diamond

// Upper half of the diamond
for (let i: number = 1; i <= n; i++) {
    let line: string = "";

    // Print spaces
    for (let j: number = n; j > i; j--) {
        line += " ";
    }

    // Print numbers
    for (let j: number = 1; j <= i; j++) {
        line += j + " ";
    }

    console.log(line);
}

// Lower half of the diamond
for (let i: number = n - 1; i >= 1; i--) {
    let line: string = "";

    // Print spaces
    for (let j: number = n; j > i; j--) {
        line += " ";
    }

    // Print numbers
    for (let j: number = 1; j <= i; j++) {
        line += j + " ";
    }

    console.log(line);
}

export {};



