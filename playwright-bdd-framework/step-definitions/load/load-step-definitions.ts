import {Given, When, Then} from '@cucumber/cucumber';
import {JMeterCommons} from '../../commons/jmeter/JMeterCommons.ts';

let jmeter: JMeterCommons;

//Given Initialize the JMeter utility
Given('Initialize the JMeter utility', function () {
    jmeter = new JMeterCommons();
});

//Then I ran JMeter test plan "LoadTest.jmx" and got the performance results
Then('I ran JMeter test plan {string} and got the performance results', function (testPlan: string) {
    jmeter.runJMeterTestPlan(testPlan);
});