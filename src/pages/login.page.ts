import { Locator, Page } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly submitButton: Locator;
    readonly loginError: Locator;

    constructor (page: Page) {
        this.page = page;
        this.emailInput = page.locator('[id="email"]');
        this.passwordInput = page.locator('[id="password"]');
        this.submitButton = page.locator('[id="submit"]');
        this.loginError = page.locator('[id="error"]');
    }

    async go () {
        await Promise.all([
          this.page.goto('/'),
          this.submitButton.waitFor({ state: 'visible' })
        ]);
    }

    async login(email: string, password: string) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.submitButton.click();
    }

    async isLoginErrorDisplayed(): Promise<boolean> {
        return await this.loginError.isVisible();
    } 

}