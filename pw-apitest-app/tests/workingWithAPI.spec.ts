import { test, expect, request } from '@playwright/test';
import tags from '../test-data/tags.json';

test.beforeEach(async ({ page }) => {
  await page.route('*/**/api/tags', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(tags),
    })
  })

  await page.goto('https://conduit.bondaracademy.com/');
  await page.waitForTimeout(500);
});

test('Has title', async ({ page }) => {
  await page.route('*/**/api/articles*', async route => {
    const response = await route.fetch();
    const responseBody = await response.json();
    responseBody.articles[0].title = 'This is a MOCK test Title';
    responseBody.articles[0].description = 'This is a MOCK test Description';

    await route.fulfill({
      body: JSON.stringify(responseBody),
    });
  });

  await page.getByText('Global Feed').click();
  await expect(page.locator('.navbar-brand')).toHaveText('conduit');
  await expect(page.locator('app-article-list h1').first()).toContainText('This is a MOCK test Title');
  await expect(page.locator('app-article-list p').first()).toContainText('This is a MOCK test Description');
});

test('Delete article', async ({ page, request }) => {
  const articleResponse = await request.post('https://conduit-api.bondaracademy.com/api/articles', {
    data: {
      article: {
        title: "test title" + Math.random().toString(36).substring(7),
        description: "test descr",
        body: "test body",
        tagList: []
      }
    }
  })
  expect(articleResponse.status()).toEqual(201);

  await page.getByText('Global Feed').click();
  await page.getByText('test title').first().click();
  await page.getByRole('button', { name: 'Delete Article' }).first().click();

  await expect(page.locator('app-article-list h1').first()).not.toContainText('test title');
});

test('Create article', async ({ page, request }) => {
  await page.getByText('New Article').click();
  await page.getByRole('textbox', { name: 'Article Title' }).fill('Test Article Title');
  await page.getByRole('textbox', { name: 'What\'s this article about?' }).fill('Test Article Description');
  await page.getByRole('textbox', { name: 'Write your article (in markdown)' }).fill('This is the body of the test article.');
  await page.getByRole('button', { name: 'Publish Article' }).click();

  const articleResponse = await page.waitForResponse('https://conduit-api.bondaracademy.com/api/articles/');
  const articleResponseBody = await articleResponse.json();
  const slugId = articleResponseBody.article.slug;

  await expect(page.locator('.article-page h1')).toContainText('Test Article Title');

  await page.getByText('Home').click();
  await page.getByText('Global Feed').click();
  await expect(page.locator('app-article-list h1').first()).toContainText('Test Article Title');

  const deleteArticleResponse = await request.delete(`https://conduit-api.bondaracademy.com/api/articles/${slugId}`);
  expect(deleteArticleResponse.status()).toEqual(204);
});