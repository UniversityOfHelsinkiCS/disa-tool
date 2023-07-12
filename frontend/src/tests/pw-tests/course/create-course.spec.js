import { test, expect } from '@playwright/test';

test('You can create a course - singular language', async ({ page }) => {
    await page.goto('http://localhost:8080/');
    await page.getByRole('textbox').click();
    await page.getByRole('textbox').fill('kimgjon');
    await page.getByRole('textbox').press('Enter');
  await page.goto('http://localhost:8080/courses');
  await page.getByRole('button', { name: 'Lisää' }).click();
  await page.locator('input[name="name-input"]').click();
  await page.locator('input[name="name-input"]').fill('Uusi kurssi');
  await page.getByRole('button', { name: 'Yksikielinen' }).click();
  await page.getByRole('button', { name: 'Luo' }).click();
  await page.getByText('Luo uusi instanssi tästä kurssista').click();
  await page.locator('input[name="name-input"]').click();
  await page.locator('input[name="name-input"]').fill('Uusi kurssi 2023');
  await page.getByRole('button', { name: 'Tallenna' }).click();
  await expect(page).toHaveScreenshot("new-course.png");
  await page.getByRole('button', { name: 'Vaihda nimeä' }).click();
  await page.locator('input[name="name-input"]').click();
  await page.locator('input[name="name-input"]').fill('Uusi kurssi  - nimeä vaihdettu');
  await page.getByRole('button', { name: 'Tallenna' }).click();
  await page.locator('button').nth(2).click();
  await page.locator('input[name="name-input"]').click();
  await page.locator('input[name="name-input"]').fill('Uusi kurssi 2023 - nimeä vaihdettu');
  await page.getByRole('button', { name: 'Tallenna' }).click();
  await expect(page).toHaveScreenshot("new-course-name-changed.png");
  await page.getByRole('button', { name: 'Kurssisivulle' }).click();
  await page.getByRole('button', { name: 'Kurssi suljettu' }).click();
  await expect(page).toHaveScreenshot("course-is-open.png");
  // Add new matrix - TODO: move to separate test
  await page.getByRole('button', { name: 'Muokkaa kurssia' }).click();
  await page.locator('td').getByRole('button').click();
  await page.locator('input[name="name-input"]').click();
  await page.locator('input[name="name-input"]').fill('Uusi osio');
  await page.getByRole('button', { name: 'Tallenna' }).click();
  await page.locator('thead').getByRole('button').click();
  await page.locator('input[name="name-input"]').click();
  await page.locator('input[name="name-input"]').fill('Taitotaso 1');
  await page.getByRole('button', { name: 'Tallenna' }).click();
  await page.getByRole('row', { name: 'Uusi osio' }).getByRole('button').nth(2).click();
  await page.locator('input[name="name-input"]').click();
  await page.locator('input[name="name-input"]').fill('Opi asia');
  await page.getByRole('button', { name: 'Tallenna' }).click();
  await expect(page).toHaveScreenshot("matrix-has-data.png");
})

test('You can create a course - multilingual', async ({ page }) => {
  await page.goto('http://localhost:8080/');
  await page.getByRole('textbox').click();
  await page.getByRole('textbox').fill('kimgjon');
  await page.getByRole('textbox').press('Enter');
  await page.goto('http://localhost:8080/courses');
  await page.getByRole('button', { name: 'Lisää' }).click();
  await page.getByRole('button', { name: 'Monikielinen' }).click();
  await page.locator('input[name="eng_name"]').click();
  await page.locator('input[name="eng_name"]').fill('Monikielinen kurssi - english');
  await page.locator('input[name="eng_name"]').press('Tab');
  await page.locator('input[name="fin_name"]').fill('Monikielinen kurssi - suomi');
  await page.locator('input[name="fin_name"]').press('Tab');
  await page.locator('input[name="swe_name"]').fill('Monikielinen kurssi - svenska');
  await page.getByRole('button', { name: 'Luo' }).click();
  await page.getByRole('button', { name: 'Vaihda nimeä' }).click();
  await expect(page).toHaveScreenshot("different-languages-visible.png");
  await page.getByRole('button', { name: 'Peru' }).click();
  await page.getByText('Luo uusi instanssi tästä kurssista').click();
  await page.getByRole('button', { name: 'Monikielinen' }).click();
  await page.locator('input[name="eng_name"]').click();
  await page.locator('input[name="eng_name"]').fill('Monikielinen kurssi instanssi - english');
  await page.locator('input[name="eng_name"]').press('Tab');
  await page.locator('input[name="fin_name"]').fill('Monikielinen kurssi instanssi - suomi');
  await page.locator('input[name="fin_name"]').press('Tab');
  await page.locator('input[name="swe_name"]').fill('Monikielinen kurssi instanssi - svenska');
  await page.getByRole('button', { name: 'Tallenna' }).click();
  await expect(page).toHaveScreenshot("course-in-finnish-visible.png");
  await page.getByRole('button', { name: 'Kurssisivulle' }).click();
  await page.getByText('SuomiSuomiSvenskaEnglish').click();
  await page.getByRole('option', { name: 'English' }).click();
  page.reload()
  //await page.goto('http://localhost:8080/user/course/54');
  await expect(page).toHaveScreenshot("course-in-english-visible.png");})
