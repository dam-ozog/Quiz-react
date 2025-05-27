import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://quiz-react2.vercel.app/');
  await page.getByRole('link', { name: 'Quiz o grach' }).click();
  await page.getByRole('radio', { name: 'Mojang' }).check();
  await page.getByRole('button', { name: 'Następne pytanie' }).click();
  await page.getByRole('button', { name: 'Cofnij' }).click();
  await page.getByRole('radio', { name: 'Electronic Arts' }).check();
  await page.getByRole('radio', { name: 'Mojang' }).check();
  await page.getByRole('button', { name: 'Następne pytanie' }).click();
  await page.getByRole('radio', { name: 'RPG' }).check();
  await page.getByRole('button', { name: 'Następne pytanie' }).click();
  await page.getByRole('button', { name: 'Następne pytanie' }).click();
  await page.getByRole('radio', { name: 'God of War' }).check();
  await page.getByRole('button', { name: 'Następne pytanie' }).click();
  await page.getByRole('radio', { name: 'Dark Souls' }).check();
  await page.getByRole('button', { name: 'Zakończ quiz' }).click();
  await page.getByRole('button', { name: 'Powtórz Quiz' }).click();
});