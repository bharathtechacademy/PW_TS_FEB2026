//Annotations are all about a set of keywords and default methods that we are going to use to run and create your test cases in playwright.

// test ==> Test is a default main method that will be considered as a independent test case.
// test.describe() ==> Test.describe method is going to help us to group the test cases as a single block. 
// test.only() ==> Test.only method is going to help us to run only that particular test case which is marked with only keyword.
// test.skip() ==> Test.skip method is going to help us to skip that particular test case which is marked with skip keyword.
// test.fixme() ==> I am sure this test case is not working. Please ignore even though it has failed. 
// test.fail() ==> I am expecting this test case to fail. Highlight if this test case is not failing. 
// test.slow()==> I am expecting this test case to be executed a little slow. Wait for some more time to complete the promise. 

import { test, expect } from '@playwright/test';


//independent test case
test.only('name of the test case', async ({ page:any }) => {
 // test steps and assertions
});


//grouping of test cases  ==> npx playwright test --grep "group2"
test.describe('group1', () => {

  test.only('Group 1 - Test Case 1', async ({}) => {
    console.log('Group 1 - Test Case 1');
  });

    test('Group 1 - Test Case 2', async ({}) => {
    console.log('Group 1 - Test Case 2');
  });

});

test.describe('group2', () => {

  test('Group 2 - Test Case 1', async ({}) => {
    console.log('Group 2 - Test Case 1');
  });

    test('Group 2 - Test Case 2', async ({}) => {
    console.log('Group 2 - Test Case 2');
  });

});