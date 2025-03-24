import { Locator, Page } from '@playwright/test';
import { LoginPage } from './login.page';

export class AddContactPage {
    readonly page: Page;
    readonly logoutButton: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameUnput: Locator;
    readonly dateOfBirthInput: Locator;
    readonly emailInput: Locator;
    readonly phoneInput: Locator;
    readonly streetAddressOneInput: Locator;
    readonly streetAddressTwoInput: Locator;
    readonly cityInput: Locator;
    readonly stateProvinceInput: Locator;
    readonly postalCodeInput: Locator;
    readonly countryInput: Locator;
    readonly submitButton: Locator;
    readonly cancelButton: Locator;
    readonly errorMessage: Locator;

    constructor (page: Page) {
        this.page = page;
        this.logoutButton = page.locator('[id="logout"]');
        this.dateOfBirthInput = page.locator('[id="birthdate"]');
        this.firstNameInput = page.locator('[id="firstName"]');
        this.lastNameUnput = page.locator('[id="lastName"]');
        this.emailInput = page.locator('[id="email"]');
        this.phoneInput = page.locator('[id="phone"]');
        this.streetAddressOneInput = page.locator('[id="street1"]');
        this.streetAddressTwoInput = page.locator('[id="street2"]');
        this.cityInput = page.locator('[id="city"]');
        this.stateProvinceInput = page.locator('[id="stateProvince"]');
        this.postalCodeInput = page.locator('[id="postalCode"]');
        this.countryInput = page.locator('[id="country"]');
        this.submitButton = page.locator('[id="submit"]');
        this.cancelButton = page.locator('[id="cancel"]');
        this.errorMessage = page.locator('[id="error"]');
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

    async clickSubmitButton() {
        return await this.submitButton.click();
    }

    async isErrorMessageDisplayed() {
        await this.errorMessage.waitFor({ state: 'visible' });
        return await this.errorMessage.isVisible();
    }

    async getTextOfTheErrorMessage() {
        return await this.errorMessage.textContent();
    }

}