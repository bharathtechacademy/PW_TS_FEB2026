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
        console.log(await this.response.json());
    }

}