import { expect, test } from '@playwright/test';
import { SignUpPage } from '../src/pages/sign-up.page';
import { generateRandomString } from '../src/helper/util';
import { INVALID_PASSWORD_ERROR, INVALID_EMAIL_ERROR } from '../src/testdata/error-messages';
import { EMPTY_FIELDS_ERROR } from '../src/testdata/error-messages';
import { INVALID_EMAIL_DATA } from '../src/testdata/parameterized-data';

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

test('should get an error when add form is missing fields', async({page}) => {
    const signUpPage = new SignUpPage(page);
    await signUpPage.go();
    await signUpPage.signUp(
        '', 
        '', 
        '', 
        '');

    expect(await signUpPage.isSignUpErrorDisplayed()).toBe(true);
    expect(await signUpPage.getTextOfSignUpError()).toStrictEqual(EMPTY_FIELDS_ERROR);
})

test('should navigate to the login page with cancel button successfully', async({page}) => {
    const signUpPage = new SignUpPage(page);
    await signUpPage.go();
    const loginPage = await signUpPage.clickCancelButton();

    expect(await loginPage.isSignUpButtonDisplayed()).toBe(true);
})

test.describe.parallel('Invalid email tests', () => {
    INVALID_EMAIL_DATA.forEach(({ email }) => {
      test(`should get and error when email is like ${email}`, async ({ page }) => {
        const signUpPage = new SignUpPage(page);
        await signUpPage.go();
        await signUpPage.signUp(
            generateRandomString(7), 
            generateRandomString(7), 
            email, 
            generateRandomString(7));

        expect(await signUpPage.isSignUpErrorDisplayed()).toBe(true);
        expect(await signUpPage.getTextOfSignUpError()).toStrictEqual(INVALID_EMAIL_ERROR);
      });
    });
  });
  