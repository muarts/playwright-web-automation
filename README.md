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