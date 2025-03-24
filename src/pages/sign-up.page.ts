import { Locator, Page } from '@playwright/test';
import { ContactListPage } from './contact-list.page';
import { LoginPage } from './login.page';

export class SignUpPage {
    readonly page: Page;
    readonly addUserForm: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly submitButton: Locator;
    readonly signUpError: Locator;
    readonly cancelButton: Locator;

    constructor (page: Page) {
        this.page = page;
        this.addUserForm = page.locator('[id="add-user"]');
        this.firstNameInput = page.locator('[id="firstName"]');
        this.lastNameInput = page.locator('[id="lastName"]');
        this.emailInput = page.locator('[id="email"]');
        this.passwordInput = page.locator('[id="password"]');
        this.submitButton = page.locator('[id="submit"]');
        this.signUpError = page.locator('[id="error"]');
        this.cancelButton = page.locator('[id="cancel"]');
    }

    async go () {
        await Promise.all([
          this.page.goto('/addUser'),
          this.addUserForm.waitFor({ state: 'visible' })
        ]);
    }

    async signUp(firstName: string, lastName: string, email: string, password: string) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.submitButton.click();
        await this.page.waitForLoadState('networkidle');
        return new ContactListPage(this.page);
    }

    async isSignUpErrorDisplayed(): Promise<boolean> {
        return await this.signUpError.isVisible();
    }
    
    async getTextOfSignUpError() : Promise<string | null> {
        return await this.signUpError.textContent();
    }

    async clickCancelButton() {
        await this.cancelButton.click();
        await this.page.waitForLoadState('networkidle');
        return new LoginPage(this.page);
    }

}