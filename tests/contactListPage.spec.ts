import { expect, test } from '@playwright/test';
import { ApiHelper } from '../src/helper/apiHelper';
import { byPassLogin } from '../src/helper/util';
import { ContactListPage } from '../src/pages/contact-list.page';

test('should logout successfully', async({page}) => {
    const apiHelper = new ApiHelper();
    await apiHelper.init();
    const response = await apiHelper.createUser();
    const userData = await response.json();
    await byPassLogin(page, userData.token);
    const contactListPage = new ContactListPage(page);
    await contactListPage.go();
    const loginPage = await contactListPage.logout();

    expect(await loginPage.isSignUpButtonDisplayed()).toBe(true);
})

test('should navigate to the add contact page with add new contact button successfully', async({page}) => {
    const apiHelper = new ApiHelper();
    await apiHelper.init();
    const response = await apiHelper.createUser();
    const userData = await response.json();
    await byPassLogin(page, userData.token);
    const contactListPage = new ContactListPage(page);
    await contactListPage.go()
    const addContactPage = await contactListPage.clickAddNewContactButton();

    expect(await addContactPage.isDateOfBirthInputDisplayed()).toBe(true);
})
