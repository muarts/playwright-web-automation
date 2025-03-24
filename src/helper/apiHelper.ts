import { request, APIRequestContext, APIResponse } from '@playwright/test';
import { generateRandomString } from './util';

export class ApiHelper {
  private requestContext: APIRequestContext;
  private baseUrl: string = 'https://thinking-tester-contact-list.herokuapp.com';

  constructor() {}

  async init() {
    this.requestContext = await request.newContext({ baseURL: this.baseUrl });
  }

  async createUser(): Promise<APIResponse> {
    const userData = {
      firstName: generateRandomString(6),
      lastName: generateRandomString(6),
      email: `${generateRandomString(8)}@fake.com`,
      password: 'password',
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
