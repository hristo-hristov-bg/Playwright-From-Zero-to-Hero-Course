import { test } from '@playwright/test';
import { PageManager } from '../page-objects/pageManager';
import {faker} from '@faker-js/faker';
import { argosScreenshot } from "@argos-ci/playwright";

test.beforeEach(async ({ page }) => {
    await page.goto('/');
})

test('Navigate to Form Page @smoke @regression', async ({ page }) => {
    const pm = new PageManager(page);
    await pm.navigateTo().formLayoutsPage();
    await pm.navigateTo().datepickerPage();
    await pm.navigateTo().smartTablePage();
    await pm.navigateTo().toastrPage();
    await pm.navigateTo().tooltipPage();
});

test('Parametrized methods', async ({ page }) => {
    const pm = new PageManager(page);
    const randomFullName = faker.person.fullName();
    const randomEmail = `${randomFullName.replace(' ', '').toLowerCase()}${faker.number.int(1000)}@test.com`;

    await pm.navigateTo().formLayoutsPage();
    await pm.onFormLayoutsPage().submitUsingTheGridFormWIthCredentialsAndSelectOption(process.env.USERNAME, process.env.PASSWORD, 'Option 1');
    await page.screenshot({ path: 'screenshots/formsLayoutPage.png' });
    const buffer = await page.screenshot();
    // console.log(buffer.toString('base64')); // Log the screenshot as a base64 string

    await pm.onFormLayoutsPage().submitInlineFormWithNameEmailAndCheckbox(randomFullName, randomEmail, true);
    await page.locator('nb-card', { hasText: 'Inline form' }).screenshot({ path: 'screenshots/inlineForm.png' });

    // await pm.navigateTo().datepickerPage();
    // await pm.onDatePickerPage().selectCommonDatePickerDateFromToday(10);
    // await pm.onDatePickerPage().selectDatePickerWithRangeFromToday(6, 18);
});

test.only('Testing with argos ci', async ({ page }) => {
    const pm = new PageManager(page);
    await pm.navigateTo().formLayoutsPage();
    await argosScreenshot(page, "form-layouts-page");
    await pm.navigateTo().datepickerPage();
    await argosScreenshot(page, "date-picker-page");
});