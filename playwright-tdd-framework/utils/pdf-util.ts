import fs from 'fs';
import { PDFParse } from 'pdf-parse';

export class PDFUtil {

    static async readPdf(filepath: string): Promise<string> {

        //Verify whether the file exists. 
        if (!fs.existsSync(filepath)) {
            throw new Error(`File not Found at Location : ${filepath}`)
        }

        //Read the PDF file and return its content as a string.
        const buffer = fs.readFileSync(filepath);
        const uint8Array = new Uint8Array(buffer);
        const pdfData = new PDFParse(uint8Array);
        const data = await pdfData.getText();
        return data.text;
    }

}

//Read the data from the PDF file. 
let pdf = await PDFUtil.readPdf('./files/Data.pdf');
console.log(pdf.includes('native mobile\nemulation for Chrome (Android) and Mobile Safari'));