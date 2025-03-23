import { expect, test } from '@playwright/test';
import { LoginPage } from '../src/pages/login.page';

test.only('should get an login error', async({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.go();
    await loginPage.login('email', 'password');

    expect(await loginPage.isLoginErrorDisplayed());
})