import { request, APIRequestContext, APIResponse } from '@playwright/test';
import { generateRandomString } from './util';
import { BASE_URL, VALID_PASSWORD } from '../testdata/common-constants';

export class ApiHelper {
  private requestContext: APIRequestContext;
  
  constructor() {}

  async init() {
    this.requestContext = await request.newContext({ baseURL: BASE_URL });
  }

  async createUser(): Promise<APIResponse> {
    const userData = {
      firstName: generateRandomString(6),
      lastName: generateRandomString(6),
      email: `${generateRandomString(8)}@fake.com`,
      password: VALID_PASSWORD,
    };

    return this.requestContext.post('/users', {
      headers: {
        Authorization: 'Bearer {{token}}',
        'Content-Type': 'application/json',
        Cookie: 'token={{token}}',
      },
      data: userData,
    });
  }

  async close() {
    await this.requestContext.dispose();
  }
}
