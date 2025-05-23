import { expect, test } from '@playwright/test';
import { delay } from 'rxjs-compat/operator/delay';

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/');
})

test.describe('Form Layouts page', () => {
    test.beforeEach(async ({ page }) => {
        await page.getByText('Forms').click();
        await page.getByText('Form Layouts').click();
    })

    test('Input fields', async ({ page }) => {
        const usingTheGridEmailInput = page.locator('nb-card', { hasText: 'Using the Grid' }).getByRole('textbox', { name: 'Email' });

        await usingTheGridEmailInput.fill('test@test.com');
        await usingTheGridEmailInput.clear();
        await usingTheGridEmailInput.pressSequentially('test2@test.com', {delay: 200});

        //generic assertion
        const inputValue = await usingTheGridEmailInput.inputValue();
        expect(inputValue).toEqual('test2@test.com');

        //locatior assertion
        await expect(usingTheGridEmailInput).toHaveValue('test2@test.com');
    })

    test('Radio buttons', async ({ page }) => {
        const usingTheGridForm = page.locator('nb-card', { hasText: 'Using the Grid' });

        // 2 options for selecting the checkbox
        // await usingTheGridForm.getByLabel('Option 1').check({force: true});
        await usingTheGridForm.getByRole('radio', { name: 'Option 1' }).check({ force: true });
        const radioStatus = await usingTheGridForm.getByRole('radio', { name: 'Option 1' }).isChecked();
        expect(radioStatus).toBeTruthy();
        await expect(usingTheGridForm.getByRole('radio', { name: 'Option 1' })).toBeChecked();

        await usingTheGridForm.getByRole('radio', { name: 'Option 2' }).check({ force: true });
        expect(await usingTheGridForm.getByRole('radio', { name: 'Option 1' }).isChecked()).toBeFalsy();
        expect(await usingTheGridForm.getByRole('radio', { name: 'Option 2' }).isChecked()).toBeTruthy();
    })
});
