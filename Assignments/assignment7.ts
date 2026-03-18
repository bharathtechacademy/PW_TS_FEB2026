const sentence: string = "Java programming is fun and challenging";

const words: string[] = sentence.split(" ");

// Count the words
console.log("Total words in the sentence are " + words.length);

// Print sentence in reverse order of words
let reverseSentence: string = "";
for (let i: number = words.length - 1; i >= 0; i--) {
    reverseSentence = reverseSentence + words[i] + " ";
}
console.log("Reverse Sentence is : " + reverseSentence.trim());

// Print each word of sentence with first letter in upper case
let uppercaseSentence: string = "";
for (const word of words) {
    uppercaseSentence = uppercaseSentence + word.substring(0, 1).toUpperCase() + word.substring(1) + " ";
}
console.log("Uppercase Sentence is : " + uppercaseSentence.trim());

export {};