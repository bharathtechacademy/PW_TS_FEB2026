import { test, expect } from '@playwright/test';

test.describe('Group 1 Tests', async () => {

    test('Group 1- Test 1', async ({ page }) => {
        console.log("Group 1 - Test 1: Executing");
    });

    test('Group 1- Test 2', async ({ page }) => {
        console.log("Group 1 - Test 2: Executing");
    });

    test('Group 1- Test 3', async ({ page }) => {
        console.log("Group 1 - Test 3: Executing");
    });

});


test.describe('Group 2 Tests', async () => {

    //Group Hooks

    test.beforeAll(async () => {
        console.log("**********Group Before All: Executing********");
    });

    test.afterAll(async () => {
        console.log("**********Group After All: Executing********");
    });

    test.beforeEach(async () => {
        console.log("#############Group Before Each: Executing############");
    });

    test.afterEach(async () => {
        console.log("#############Group After Each: Executing############");
    });

    test('Group 2- Test 1', async ({ page }) => {
        console.log("Group 2 - Test 1: Executing");
    });

    test('Group 2- Test 2', async ({ page }) => {
        console.log("Group 2 - Test 2: Executing");
    });

    test('Group 2- Test 3', async ({ page }) => {
        console.log("Group 2 - Test 3: Executing");
    });

});

