import { test } from '@playwright/test';
import { APICommons } from '../../commons/api/api-commons.ts';
import testData from '../../testdata/api/data.json' with { type: 'json' };

test.describe('API smoke', () => {
  let apiCommons: APICommons;

  test.beforeEach(async () => {
    apiCommons = new APICommons();
    await apiCommons.initializeRequestContext();
  });

  test('GET /get returns 200', async () => {
    const data = testData.sampleGet;
    await apiCommons.getResponse(data.requestType, data.endpoint);
    await apiCommons.validateStatusCode(data.expectedStatusCode);
    await apiCommons.validateStatusMessage(data.expectedStatusMessage);
  });
});
