import { expect, test } from '@playwright/test';
import { LoginPage } from '../src/pages/login.page';
import { ApiHelper } from '../src/helper/apiHelper';

test('should login successfully', async({page}) => {
    const apiHelper = new ApiHelper();
    await apiHelper.init();
    const response = await apiHelper.createUser();
    const userData = await response.json();
    const loginPage = new LoginPage(page);
    await loginPage.go();
    const contactListPage = await loginPage.login(userData.user.email, 'password');

    expect(await contactListPage.isAddContactButtonDisplayed());
})

test('should get an login error', async({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.go();
    await loginPage.login('email', 'password');

    expect(await loginPage.isLoginErrorDisplayed());
})