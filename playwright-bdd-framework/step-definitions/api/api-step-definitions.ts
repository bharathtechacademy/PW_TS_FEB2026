import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { APICommons } from '../../commons/api/api-commons.ts';
import data from '../../testdata/api/data.json' with {type: 'json'};

let api: APICommons;

//Given Initialize the API request context
Given('Initialize the API request context', async function () {
    api = new APICommons();
    await api.initializeRequestContext();
});

//When I send a "POST" request with endpoint "/user/repos" to create a repository with the name "JmeterRepo" and description "This is a duplicate repository"
When('I send a {string} request with endpoint {string} to create a repository with the name {string} and description {string}', async function (requestType: string, endpoint: string, repoName: string, repoDescription: string) {
    const requestBody = data.createRepo.body;
    requestBody.name = repoName;
    requestBody.description = repoDescription;
    await api.getResponse(requestType, endpoint, requestBody);
});

//Then I should receive a response with status code 422
Then('I should receive a response with status code {int}', async function (expectedStatusCode: number) {
    await api.validateStatusCode(expectedStatusCode);
});

//Then I should receive a response with status message "Unprocessable Entity"
Then('I should receive a response with status message {string}', async function (expectedStatusMessage: string) {
    await api.validateStatusMessage(expectedStatusMessage);
});

//I should receive a response with body having "message" as "Repository creation failed."
Then('I should receive a response with body having {string} as {string}', async function (key: string, expValue: string) {
    await api.validateResponseBody(key, expValue);
});

//When I send a "GET" request with endpoint "/repos/bharathtechacademy05/playwright-bdd-repo" to get the repository
When('I send a {string} request with endpoint {string} to get the repository', async function (requestType: string, endpoint: string) {
    await api.getResponse(requestType, endpoint);
});

// When I send a "PATCH" request with endpoint "/repos/bharathtechacademy05/playwright-bdd-repo" to update the repository description "updated description"
When('I send a {string} request with endpoint {string} to update the repository description {string}', async function (requestType: string, endpoint: string, repoDescription: string) {
    const requestBody = data.updateRepo.body;
    requestBody.description = repoDescription;
    await api.getResponse(requestType, endpoint, requestBody);
});

//When I send a "DELETE" request with endpoint "/repos/bharathtechacademy05/playwright-bdd-repo" to delete the repository
When('I send a {string} request with endpoint {string} to delete the repository', async function (requestType: string, endpoint: string) {
    await api.getResponse(requestType, endpoint);
});