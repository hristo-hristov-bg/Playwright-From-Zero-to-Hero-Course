import { Page } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class FormLayoutsPage extends HelperBase {

    constructor(page: Page) {
        super(page);
    }

    async submitUsingTheGridFormWIthCredentialsAndSelectOption(email: string, password: string, optionText: string) {
        const usingTheGridForm = this.page.locator('nb-card', { hasText: 'Using the Grid' });
        await usingTheGridForm.getByRole('textbox', { name: 'Email' }).fill(email);
        await usingTheGridForm.getByRole('textbox', { name: 'Password' }).fill(password);
        await usingTheGridForm.getByRole('radio', { name: optionText }).check({ force: true });
        await usingTheGridForm.getByRole('button').click();
    }

    /**
     * This method fills the inline form with the provided name and email, and checks the "Remember me" checkbox if specified.
     * @param name - should be first and last name, e.g. "Jane Doe"
     * @param email - valid email for the test user, e.g. "test@test.com"
     * @param rememberMe - true or false if user session should be remembered
     * @returns {Promise<void>}
     */
    async submitInlineFormWithNameEmailAndCheckbox(name: string, email: string, rememberMe: boolean)  {
    const inlineForm = this.page.locator('nb-card', { hasText: 'Inline Form' });
        await inlineForm.getByRole('textbox', { name: 'Jane Doe' }).fill(name);
        await inlineForm.getByRole('textbox', { name: 'Email' }).fill(email);
        if(rememberMe) {
            await inlineForm.getByRole('checkbox', { name: 'Remember me' }).check({ force: true });
        }
        await inlineForm.getByRole('button').click();
    }
}