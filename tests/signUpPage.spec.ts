import { expect, test } from '@playwright/test';
import { SignUpPage } from '../src/pages/sign-up.page';
import { generateRandomString } from '../src/helper/util';
import { INVALID_PASSWORD_ERROR } from '../src/testdata/error-messages';

test('should sign up successfully', async({page}) => {
    const signUpPage = new SignUpPage(page);
    await signUpPage.go();
    const contactListPage = await signUpPage.signUp(
        generateRandomString(7), 
        generateRandomString(7), 
        `${generateRandomString(8)}@fake.com`, 
        generateRandomString(7));

    expect(await contactListPage.isAddContactButtonDisplayed()).toBe(true);
})

test('should get an error when password is less than seven characters', async({page}) => {
    const signUpPage = new SignUpPage(page);
    await signUpPage.go();
    const invalidPassword = generateRandomString(6);
    await signUpPage.signUp(
        generateRandomString(7), 
        generateRandomString(7), 
        `${generateRandomString(8)}@fake.com`, 
        invalidPassword);

    expect(await signUpPage.isSignUpErrorDisplayed()).toBe(true);
    expect(await signUpPage.getTextOfSignUpError()).toStrictEqual(INVALID_PASSWORD_ERROR(invalidPassword));
})
