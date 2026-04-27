import { test } from "@playwright/test";
import { JMeterCommons } from "../../commons/jmeter/JMeterCommons.ts";

test.describe("JMeter Load Test", () => {

    let jmeter: JMeterCommons;

    test.beforeEach(async () => {
        jmeter = new JMeterCommons();
    });

    test("Run JMeter Test Plan", async () => {
        test.setTimeout(180000); // Set timeout to 3 minutes for load test execution
        await jmeter.runJMeterTestPlan("LoadTest.jmx");
    });

});