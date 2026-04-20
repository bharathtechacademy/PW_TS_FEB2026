import {test} from '@playwright/test';
import {APICommons} from '../../commons/api/api-commons.ts';
import testData from '../../testdata/api/data.json' with {type: 'json'};

test.describe('API Tests', () => {

    let apiCommons: APICommons; 

    //Method to Prepare API request context before each and every test case. 
    test.beforeEach(async () => {
        apiCommons = new APICommons();
        await apiCommons.initializeRequestContext();
    });


    //Test Case 1: Request to create duplicate repository with in github
    test('Create Duplicate Repository', async () => {
        const data = testData.duplicateRepo;
        await apiCommons.getResponse(data.requestType, data.endpoint, data.body);
        await apiCommons.validateStatusCode(data.expectedStatusCode);
        await apiCommons.validateStatusMessage(data.expectedStatusMessage);
        await apiCommons.validateResponseBody('message', data.expErrorMessage);
    });

    //Test Case 2: Request to create a valid repository in github
    test('Create Valid Repository', async () => {
        const data = testData.validRepo;
        await apiCommons.getResponse(data.requestType, data.endpoint, data.body);
        await apiCommons.validateStatusCode(data.expectedStatusCode);
        await apiCommons.validateStatusMessage(data.expectedStatusMessage);
        await apiCommons.validateResponseBody('name', data.body.name);
    });

    //Test Case 3: Request to delete the repository created 
    test('Delete Repository', async () => {
        const data = testData.deleteRepo;
        await apiCommons.getResponse(data.requestType, data.endpoint);
        await apiCommons.validateStatusCode(data.expectedStatusCode);
        await apiCommons.validateStatusMessage(data.expectedStatusMessage);
    });
    
});