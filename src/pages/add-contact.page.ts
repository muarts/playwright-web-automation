import { Locator, Page } from '@playwright/test';
import { LoginPage } from './login.page';

export class AddContactPage {
    readonly page: Page;
    readonly logoutButton: Locator;
    readonly dateOfBirthInput: Locator;

    constructor (page: Page) {
        this.page = page;
        this.logoutButton = page.locator('[id="logout"]');
        this.dateOfBirthInput = page.locator('[id="birthdate"]');
    }

    async go () {
        await Promise.all([
          this.page.goto('/addContact'),
          this.dateOfBirthInput.waitFor({ state: 'visible' })
        ]);
    }

    async logout() {
        await this.logoutButton.click();
        await this.page.waitForLoadState('networkidle');
        return new LoginPage(this.page);
    }

    async isDateOfBirthInputDisplayed(): Promise<boolean> {
        return await this.dateOfBirthInput.isVisible();
    }

}