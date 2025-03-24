import { expect, test } from '@playwright/test';
import { LoginPage } from '../src/pages/login.page';
import { ApiHelper } from '../src/helper/apiHelper';
import { generateRandomString } from '../src/helper/util';
import { VALID_PASSWORD } from '../src/testdata/common-constants';

test('should login successfully', async({page}) => {
    const apiHelper = new ApiHelper();
    await apiHelper.init();
    const response = await apiHelper.createUser();
    const userData = await response.json();
    const loginPage = new LoginPage(page);
    await loginPage.go();
    const contactListPage = await loginPage.login(userData.user.email, VALID_PASSWORD);

    expect(await contactListPage.isAddContactButtonDisplayed()).toBe(true);
})

test('should get an login error', async({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.go();
    await loginPage.login(generateRandomString(7), generateRandomString(7));

    expect(await loginPage.isLoginErrorDisplayed()).toBe(true);
})