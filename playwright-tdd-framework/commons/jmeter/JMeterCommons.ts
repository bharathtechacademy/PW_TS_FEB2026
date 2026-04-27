import { exec } from 'child_process';


export class JMeterCommons {

    //Common method to run from command line 
    private executeCommand(command: string): Promise<string> {

        return new Promise((resolve, reject) => {

            //run the command
            exec(command, (error, stdout, stderr) => {
                if (error) {
                    reject(`Error executing command: ${command}, and error message: ${error.message}`);
                    return;
                }
                console.log(`Command Output: ${stdout}`);
                resolve(command + " :  Executed Successfully");
            });

        });

    }

    //Common method to run JMeter test plan 
    async runJMeterTestPlan(jmxFile: string): Promise<void> {

        console.log(`Running JMeter Test Plan: ${jmxFile}`);
        //Update the relative path of the JMeter folder structure. 
        const projectRoot = process.cwd();//Get the current working directory or project folder. 
        const jmeterBasePath = `${projectRoot}/tests/load/jmeter`;
        const jmeterToolPath = `${projectRoot}/tests/load/jmeter/bin/jmeter.bat`;
        const testPlanPath = `${projectRoot}/tests/load/jmeter/testplans/${jmxFile}`;

        //Update the relative path of the results folders. 
        console.log(`Generating results and reports for JMeter Test Plan: ${jmxFile}`);
        const timestamp = new Date().toISOString().replaceAll(/[^a-zA-Z0-9]/g, "");
        const resultsPath = `${projectRoot}/tests/load/jmeter/results/TestResult_${timestamp}.csv`;
        const reportsPath = `${projectRoot}/tests/load/jmeter/report-output`;

        //Run the JMeter test plan and generate the CSV test results. 
        console.log(`Executing JMeter Test Plan: ${jmxFile}`);

        //Execute the command to run the JMeter test plan and generate results into csv file
        const command = `${jmeterToolPath} -n -t ${testPlanPath} -l ${resultsPath}`;
        console.log(`Executing Command: ${command}`);
        await this.executeCommand(command);

        //Generate the HTML report from the CSV results using JMeter's reporting capabilities
        const reportCommand = `"${jmeterToolPath}" -g "${resultsPath}" -o "${reportsPath}"`;
        console.log(`Generating HTML Report with Command: ${reportCommand}`);
        await this.executeCommand(reportCommand);

        console.log(`JMeter Test Plan Execution Completed: ${jmxFile}`);
    }

}