import { expect, request } from '@playwright/test';
import type { APIRequestContext } from '@playwright/test';
import config from '../../config/config.json' with { type: 'json' };

export class APICommons {
  private requestContext: APIRequestContext | undefined;
  private response: Awaited<ReturnType<APIRequestContext['get']>> | undefined;

  async initializeRequestContext(): Promise<void> {
    const token = process.env.API_BEARER_TOKEN;
    this.requestContext = await request.newContext({
      baseURL: config.api.base_url,
      extraHTTPHeaders: token
        ? { Authorization: `Bearer ${token}`, Accept: 'application/json' }
        : { Accept: 'application/json' },
    });
  }

  async getResponse(
    requestType: string,
    endpoint: string,
    requestBody?: unknown,
  ): Promise<void> {
    if (!this.requestContext) {
      throw new Error('Request context not initialized');
    }
    const method = requestType.toLowerCase();
    switch (method) {
      case 'get':
        this.response = await this.requestContext.get(endpoint);
        break;
      case 'post':
        this.response = await this.requestContext.post(endpoint, {
          data: requestBody,
        });
        break;
      case 'put':
        this.response = await this.requestContext.put(endpoint, {
          data: requestBody,
        });
        break;
      case 'patch':
        this.response = await this.requestContext.patch(endpoint, {
          data: requestBody,
        });
        break;
      case 'delete':
        this.response = await this.requestContext.delete(endpoint);
        break;
      default:
        throw new Error(`Unsupported request type: ${requestType}`);
    }
  }

  async validateStatusCode(expectedStatusCode: number): Promise<void> {
    if (!this.response) {
      throw new Error('No response available');
    }
    const actualStatusCode = this.response.status();
    expect(actualStatusCode).toBe(expectedStatusCode);
  }

  async validateStatusMessage(expectedStatusMessage: string): Promise<void> {
    if (!this.response) {
      throw new Error('No response available');
    }
    const actualStatusMessage = this.response.statusText();
    expect(actualStatusMessage).toBe(expectedStatusMessage);
  }

  async validateResponseBody(key: string, expValue: unknown): Promise<void> {
    if (!this.response) {
      throw new Error('No response available');
    }
    const responseBody = (await this.response.json()) as Record<string, unknown>;
    const actualValue = responseBody[key];
    expect(actualValue).toBe(expValue);
  }
}
