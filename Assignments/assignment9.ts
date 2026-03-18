const n: number = 5;   // Total number of rows for the pattern

// Outer loop controls the number of rows
for (let i: number = 1; i <= n; i++) {

    //empty line
    let line: string = "";

    // Inner loop to print spaces before stars in each row
    for (let j: number = i; j < n; j++) {
        line += " ";
    }
    // Inner loop to print stars in each row
    for (let j: number = 1; j <= i; j++) {
        line += "*";
    }

    console.log(line);
}

export { };



