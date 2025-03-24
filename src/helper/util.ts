import { Page } from "@playwright/test";
import { BASE_URL } from "../testdata/common-constants";

export function generateRandomString(length: number): string {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

export async function byPassLogin(page: Page, token: string) {
    await page.context().addCookies([
        {
            name: 'token',
            value: token,
            domain: 'thinking-tester-contact-list.herokuapp.com',
            path: '/'
        }
    ])
}