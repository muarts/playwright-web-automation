import { Locator, Page } from '@playwright/test';

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

    async isAddContactButtonDisplayed(): Promise<boolean> {
        return await this.addContactButton.isVisible();
    } 

}