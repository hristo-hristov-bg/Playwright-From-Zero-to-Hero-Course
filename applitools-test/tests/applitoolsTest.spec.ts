import { test } from '@applitools/eyes-playwright/fixture';

test('Applitools VisualTesting', async ({ page, eyes }) => {
  await page.goto('/');

  await eyes.check('Home Page')

  await page.getByText('Forms').click()
  await page.getByText('Form Layouts').click()

  await eyes.check('Form Layouts Page')

});
