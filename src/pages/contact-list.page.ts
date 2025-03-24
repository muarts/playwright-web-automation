import { Locator, Page } from '@playwright/test';
import { LoginPage } from './login.page';

export class ContactListPage {
    readonly page: Page;
    readonly addContactButton: Locator;
    readonly logoutButton: Locator;

    constructor (page: Page) {
        this.page = page;
        this.addContactButton = page.locator('[id="add-contact"]');
        this.logoutButton = page.locator('[id="logout"]');
    }

    async go () {
        await Promise.all([
          this.page.goto('/contactList'),
          this.addContactButton.waitFor({ state: 'visible' })
        ]);
    }

    async logout() {
        await this.logoutButton.click();
        await this.page.waitForLoadState('networkidle');
        return new LoginPage(this.page);
    }

    async isAddContactButtonDisplayed(): Promise<boolean> {
        return await this.addContactButton.isVisible();
    } 

}