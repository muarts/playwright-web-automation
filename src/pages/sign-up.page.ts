import { Locator, Page } from '@playwright/test';
import { ContactListPage } from './contact-list.page';

export class SignUpPage {
    readonly page: Page;
    readonly addUserForm: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly submitButton: Locator;
    readonly signUpError: Locator;

    constructor (page: Page) {
        this.page = page;
        this.addUserForm = page.locator('[id="add-user"]');
        this.firstNameInput = page.locator('[id="firstName"]');
        this.lastNameInput = page.locator('[id="lastName"]');
        this.emailInput = page.locator('[id="email"]');
        this.passwordInput = page.locator('[id="password"]');
        this.submitButton = page.locator('[id="submit"]');
        this.signUpError = page.locator('[id="error"]');
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
        return new ContactListPage(this.page);
    }

    async isSignUpErrorDisplayed(): Promise<boolean> {
        return await this.signUpError.isVisible();
    } 

}