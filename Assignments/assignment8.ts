const paragraph: string =
    "Java is a popular programming language. Java is used for web development, mobile applications, and more.";

const words: string[] = paragraph.split(" ");

// Get total count and index of 'Java' words
let count: number = 0;

for (let i: number = 0; i < words.length; i++) {
    if (words[i].toLowerCase() === "java") {
        console.log("Java word is present in Array with Index : " + i);
        count++;
    }
}

console.log("Total words with Java are : " + count);

export {};