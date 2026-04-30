import fs from 'fs';
import xlsx from 'xlsx';

export class ExcelUtil {

    static readExcel(filePath: string, sheetName: string): any {

        //Verify whether the file exists. 
        if(!fs.existsSync(filePath)){
            throw new Error(`File not Found at Location : ${filePath}`)
        }

        //Read the workbook from the file. 
        const workbook = xlsx.readFile(filePath);

        //Get the specific sheet from the workbook. 
        const sheet = workbook.Sheets[sheetName];

        //Verify whether the sheet exists. 
        if(!sheet){
            throw new Error(`${sheetName} => Sheet not found within the workbook.`)
        }

        //Read the data from the sheet and convert it into JSON format. 
        return xlsx.utils.sheet_to_json(sheet);

    }

}

let excel = ExcelUtil.readExcel("./files/TestData.xlsx", "Sheet1");
console.log(excel);