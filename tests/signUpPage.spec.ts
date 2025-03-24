import { expect, test } from '@playwright/test';
import { SignUpPage } from '../src/pages/sign-up.page';
import { generateRandomString } from '../src/helper/util';

test('should sign up successfully', async({page}) => {
    const signUpPage = new SignUpPage(page);
    await signUpPage.go();
    const contactListPage = await signUpPage.signUp(
        generateRandomString(7), 
        generateRandomString(7), 
        `${generateRandomString(8)}@fake.com`, 
        generateRandomString(7));

    expect(await contactListPage.isAddContactButtonDisplayed());
})
