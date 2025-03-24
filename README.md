# Web automation using Playwright and Typescript with POM approach

This is a test automation project for the [Contact List App automation practice website](https://thinking-tester-contact-list.herokuapp.com)

The project is written entirely in Playwright/TypeScript using the Page Object Model (POM) approach to ensure clean and maintainable automation.

When testing, it is always best to test features in <ins>isolation</ins> to keep test cases clear and execution times short. Preparing the test state beforehand for the feature under test is a good practice. To achieve this, we can manipulate the application using APIs and leverage features provided by test automation libraries.

For instance, if we need to test the login feature, we don’t need to go through the process of signing up a new user within the UI. Doing so would make our test case more complex and slow down execution. Instead, we can leverage the API of our application, as shown in the example below:

```typescript
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
```

Okay, we’ve tested the login feature, and it works. What’s next? How about logout?

To test the logout functionality, we first need to log in. In fact, many features of a web application require a logged-in user. If we log in through the UI every time we run a test, execution time will increase significantly.

To optimize this, we need a way to bypass the login step using a tailored approach specific to the application under test. Here’s an example:

```typescript
export async function byPassLogin(page: Page, token: string) {
    await page.context().addCookies([
        {
            name: 'token',
            value: token,
            domain: DOMAIN,
            path: '/'
        }
    ])
}
```

In our test, we first create a user using the API. Then, we extract the token from the response and add it to the cookies. With this setup, we are ready to test the logout feature—nothing more. By isolating the feature under test, we also reduce test execution time.

```typescript
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
```