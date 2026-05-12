import fs from 'fs';
import { recognize } from 'tesseract.js';

export class ImageTextUtil {

    /**
     * Reads text from an image file using Tesseract OCR.
     */
    static async readTextFromImage(filePath: string, language: string = 'eng'): Promise<string> {

        if (!fs.existsSync(filePath)) {
            throw new Error(`File not Found at Location : ${filePath}`)
        }

        const { data: { text } } = await recognize(filePath, language);
        return text.trim();
    }

    /**
     * Reads text from an in-memory image (for example a Playwright screenshot buffer).
     */
    static async readTextFromImageBuffer(imageBuffer: Buffer, language: string = 'eng'): Promise<string> {
        const { data: { text } } = await recognize(imageBuffer, language);
        return text.trim();
    }

}
