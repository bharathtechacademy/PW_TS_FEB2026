import { test, expect, request } from '@playwright/test';
import config from '../../config/config.json' with {type: 'json'};

export class APICommons {

    private requestContext: any;
    private response: any;

    //Method to Create the request context (Adding base URL, headers, and authorization details before sending the request to the API)
    async initializeRequestContext() {
        this.requestContext = await request.newContext({
            baseURL: config.api.base_url,
            extraHTTPHeaders: {
                'Authorization': config.api.bearer_token,
                'Accept': 'application/vnd.github+json',
                'X-GitHub-Api-Version': '2026-03-10'
            }
        })
    }

    //Common method to send a request and get the response. 
    async getResponse(requestType: string, endpoint: string, requestBody?: any) {

        switch (requestType.toLowerCase()) {
            case 'get':
                this.response = await this.requestContext.get(endpoint);
                break;
            case 'post':
                this.response = await this.requestContext.post(endpoint, { data: requestBody });
                break;
            case 'put':
                this.response = await this.requestContext.put(endpoint, { data: requestBody });
                break;
            case 'patch':
                this.response = await this.requestContext.patch(endpoint, { data: requestBody });
                break;
            case 'delete':
                this.response = await this.requestContext.delete(endpoint);
                break;
            default:
                throw new Error(`Unsupported request type: ${requestType}`);
        }

        //wait for 2 seconds to get the response.
        setTimeout(() => {}, 2000);
        if (requestType.toLowerCase()!== 'delete') {
            console.log(await this.response.json());
        }
    }


    // Method to validate the status code
    async validateStatusCode(expectedStatusCode: number) {
        const actualStatusCode =await this.response.status();
        expect(actualStatusCode).toBe(expectedStatusCode);
    };

    // Method To validate the status message. 
        async validateStatusMessage(expectedStatusMessage: string) {
        const actualStatusMessage=await this.response.statusText();
        expect(actualStatusMessage).toBe(expectedStatusMessage);
    };

    //Method to Validate the Response Body
    async validateResponseBody(key:string, expValue:any){
        const responseBody = await this.response.json();
        const actualValue = responseBody[key.toLowerCase()];
        expect(actualValue).toBe(expValue);
    }

    //Method to Validate the Response Headers
    async validateResponseHeader(headerKey:string, expectedHeaderValue:string){
        const responseHeaders = await this.response.headers();
        const actualHeaderValue = responseHeaders[headerKey.toLowerCase()];
        expect(actualHeaderValue).toBe(expectedHeaderValue);
    }

    //Method to validate the schema of the response body
    async validateResponseSchema(key:string,expectedType:string){
        const responseBody = await this.response.json();
        const actualValue = responseBody[key.toLowerCase()];
        const type = typeof actualValue;
        expect(type).toBe(expectedType);
    }

    //Method to validate the response cookies. 
    async validateResponseCookies(cookieName: string, expectedCookieValue: string) {
        const cookies = await this.response.cookies();
        const actualCookieValue = cookies[cookieName.toLowerCase()];
        expect(actualCookieValue).toBe(expectedCookieValue);       
    }
}