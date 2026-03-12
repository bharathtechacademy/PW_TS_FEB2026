// Create array to store student names
const studentNames: string[] = ['Suresh', 'Mahesh', 'Naresh'];

// Create array to store student marks
const studentMarks: number[] = [75, 80, 82];

// Variable to store total marks for average calculation
let total: number = 0;

// Create a new array to store updated marks
const updatedMarks: number[] = [];

// Print heading before displaying updated marks
console.log("Updated Marks:");

// Loop through studentMarks array using normal for loop
for (let i = 0; i < studentMarks.length; i++) {

    // Add 10 marks to each student without modifying original array
    updatedMarks[i] = studentMarks[i] + 10;

    // Add updated mark to total for average calculation
    total += updatedMarks[i];

    // Print student name with updated mark
    console.log(`${studentNames[i]}: ${updatedMarks[i]}`);
}

// Calculate average marks
const average: number = total / updatedMarks.length;

// Print average marks rounded to 1 decimal place
console.log(`Average Marks: ${average}`);
