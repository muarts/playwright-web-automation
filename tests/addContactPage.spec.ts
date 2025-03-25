import { expect, test } from '@playwright/test';
import { ApiHelper } from '../src/helper/apiHelper';
import { byPassLogin, getContactInfo } from '../src/helper/util';
import { AddContactPage } from '../src/pages/add-contact.page';
import { FIRST_NAME_AND_LAST_NAME_ARE_REQUIRED_ERROR } from '../src/testdata/error-messages';

test('should get an error when first name and last name are missing', async({page}) => {
    const apiHelper = new ApiHelper();
    await apiHelper.init();
    const response = await apiHelper.createUser();
    const userData = await response.json();
    await byPassLogin(page, userData.token);
    const addContactPage = new AddContactPage(page);
    await addContactPage.go();

    await addContactPage.clickSubmitButton();

    expect(await addContactPage.isErrorMessageDisplayed()).toBe(true);
    expect(await addContactPage.getTextOfTheErrorMessage()).toStrictEqual(FIRST_NAME_AND_LAST_NAME_ARE_REQUIRED_ERROR);
})


test('should add new contact with first name and last name successfully', async({page}) => {
    const apiHelper = new ApiHelper();
    await apiHelper.init();
    const response = await apiHelper.createUser();
    const userData = await response.json();
    await byPassLogin(page, userData.token);
    const addContactPage = new AddContactPage(page);
    await addContactPage.go();
    const contactInfToAdd = await getContactInfo();
    const fullNameOfTheContactInfoToAdd = contactInfToAdd.getFirstName() + ' ' + contactInfToAdd.getLastName();
    const contactListPage = await addContactPage.addNewContactInfo(contactInfToAdd);

    expect(await contactListPage.getTextOfContactTableRow()).toContain(fullNameOfTheContactInfoToAdd);
})

