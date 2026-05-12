import fs from 'fs';
import Jimp from 'jimp';
import {
    BarcodeFormat,
    BinaryBitmap,
    DecodeHintType,
    HybridBinarizer,
    MultiFormatReader,
    RGBLuminanceSource
} from '@zxing/library';

export class BarcodeUtil {
    private static readonly hints = new Map<DecodeHintType, unknown>([
        [DecodeHintType.POSSIBLE_FORMATS, [
            BarcodeFormat.CODE_128,
            BarcodeFormat.CODE_39,
            BarcodeFormat.EAN_13,
            BarcodeFormat.EAN_8,
            BarcodeFormat.UPC_A,
            BarcodeFormat.UPC_E,
            BarcodeFormat.ITF,
            BarcodeFormat.CODABAR,
            BarcodeFormat.QR_CODE,
            BarcodeFormat.DATA_MATRIX,
            BarcodeFormat.AZTEC,
            BarcodeFormat.PDF_417
        ]],
        [DecodeHintType.TRY_HARDER, true]
    ]);

    static async readBarcode(filePath: string): Promise<string> {
        // Verify whether the image file exists.
        if (!fs.existsSync(filePath)) {
            throw new Error(`File not Found at Location : ${filePath}`);
        }

        // Read image pixels and convert them to ZXing luminance source.
        const { bitmap: { data, width, height } } = await Jimp.read(filePath);
        const binaryBitmap = new BinaryBitmap(new HybridBinarizer(new RGBLuminanceSource(data, width, height)));

        const reader = new MultiFormatReader();
        reader.setHints(this.hints);

        try {
            return reader.decode(binaryBitmap).getText();
        } catch (error) {
            throw new Error(`Unable to decode barcode from file: ${filePath}. ${(error as Error).message}`);
        }
    }

}
