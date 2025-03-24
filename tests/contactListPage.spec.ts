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
