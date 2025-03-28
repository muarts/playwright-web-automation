import { Locator, Page } from '@playwright/test';
import { LoginPage } from './login.page';
import { AddContactPage } from './add-contact.page';

export class ContactListPage {
    readonly page: Page;
    readonly addContactButton: Locator;
    readonly logoutButton: Locator;
    readonly addNewContactButton: Locator;
    readonly contactTableRow: Locator;

    constructor (page: Page) {
        this.page = page;
        this.addContactButton = page.locator('[id="add-contact"]');
        this.logoutButton = page.locator('[id="logout"]');
        this.addNewContactButton = page.locator('[id="add-contact"]');
        this.contactTableRow = page.locator('[class="contactTableBodyRow"]');
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

    async clickAddNewContactButton() {
        await this.addNewContactButton.click();
        await this.page.waitForLoadState('networkidle');
        return new AddContactPage(this.page);
    }

    async getTextOfContactTableRow() {
        await this.contactTableRow.waitFor({ state: 'visible' })
        return this.contactTableRow.textContent();
    }

}