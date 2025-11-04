// tests/navigation.spec.js
import { test, expect } from '@playwright/test';

test.describe('Site navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/'); 
  });

  test('Home page shows Home <h1> and correct nav links', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Home');
    await expect(page.getByRole('link', { name: 'Home' })).toHaveAttribute('href', 'index.html');
    await expect(page.getByRole('link', { name: 'About' })).toHaveAttribute('href', 'about.html');
    await expect(page.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', 'contact.html');
  });

  test('About link navigates to About and H1 updates', async ({ page }) => {
    await page.getByRole('link', { name: 'About' }).click();
    await expect(page).toHaveURL(/about\.html$/);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('About');
    await expect(page).toHaveTitle('About');
  });

  test('Contact link navigates to Contact and H1 updates', async ({ page }) => {
    await page.getByRole('link', { name: 'Contact' }).click();
    await expect(page).toHaveURL(/contact\.html$/);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Contact');
    await expect(page).toHaveTitle('Contact');
  });

  test('Home link returns back Home :3', async ({ page }) => {
    await page.getByRole('link', { name: 'About' }).click();
    await page.getByRole('link', { name: 'Home' }).click();
    await expect(page).toHaveURL(/(\/|\/index\.html)$/);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Home');
    await expect(page).toHaveTitle('Home');
  });
});
