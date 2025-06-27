import { test } from '../test-options';
import { faker } from '@faker-js/faker';

test('Parametrized methods', async ({ page, pageManager }) => {
    const randomFullName = faker.person.fullName();
    const randomEmail = `${randomFullName.replace(' ', '').toLowerCase()}${faker.number.int(1000)}@test.com`;

    await pageManager.onFormLayoutsPage().submitUsingTheGridFormWIthCredentialsAndSelectOption(process.env.USERNAME, process.env.PASSWORD, 'Option 1');
    await pageManager.onFormLayoutsPage().submitInlineFormWithNameEmailAndCheckbox(randomFullName, randomEmail, true);
    await page.close();
});