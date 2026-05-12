import fs from 'fs';
import { recognize } from 'tesseract.js';

/**
 * Utility helper for OCR (Optical Character Recognition).
 * This class reads visible text from image files.
 */
export class ImageTextUtil {

    /**
     * Reads text from an image using Tesseract OCR.
     *
     * @param filePath Path of the image file (absolute or relative).
     * @param language OCR language code supported by Tesseract. Default is 'eng' (English).
     * @returns Extracted text from the image after trimming extra spaces/new lines from ends.
     * @throws Error when the file does not exist.
     */
    static async readTextFromImage(filePath: string, language: string = 'eng'): Promise<string> {

        // Step 1: Verify that the image file exists before OCR starts.
        if (!fs.existsSync(filePath)) {
            throw new Error(`File not Found at Location : ${filePath}`);
        }

        // Step 2: Run OCR on the image and extract only the recognized text value.
        const {
            data: { text }
        } = await recognize(filePath, language);

        // Step 3: Remove trailing/leading whitespace and return clean text.
        return text.trim();
    }

}
