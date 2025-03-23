import { request, APIRequestContext, APIResponse } from '@playwright/test';

export class ApiHelper {
  private requestContext: APIRequestContext;
  private baseUrl: string = 'https://thinking-tester-contact-list.herokuapp.com';

  constructor() {}

  async init() {
    this.requestContext = await request.newContext({ baseURL: this.baseUrl });
  }

  async createUser(token: string): Promise<APIResponse> {
    const userData = {
      firstName: this.generateRandomString(6),
      lastName: this.generateRandomString(6),
      email: `${this.generateRandomString(8)}@fake.com`,
      password: 'password',
    };

    return this.requestContext.post('/users', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Cookie: `token=${token}`,
      },
      data: userData,
    });
  }

  private generateRandomString(length: number): string {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  }

  async close() {
    await this.requestContext.dispose();
  }
}
