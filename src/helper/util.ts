import { Page } from "@playwright/test";
import { DOMAIN } from "../testdata/common-constants";
import ContactInfo from "../testdata/contact-info";

export function generateRandomString(length: number): string {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

export async function byPassLogin(page: Page, token: string) {
    await page.context().addCookies([
        {
            name: 'token',
            value: token,
            domain: DOMAIN,
            path: '/'
        }
    ])
}

export async function getContactInfo() {
    return ContactInfo.builder()
        .setFirstName(generateRandomString(7))
        .setLastName(generateRandomString(7));
}