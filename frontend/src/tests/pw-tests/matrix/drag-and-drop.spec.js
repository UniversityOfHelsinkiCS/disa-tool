import { test, expect } from '@playwright/test'

test.describe('Drag and Drop', () => {
  test.only('Create objective', async ({ page }) => {
    await page.goto('http://localhost:8080/')
    await page.getByRole('textbox').click()
    await page.getByRole('textbox').fill('terhit')
    await page.getByRole('textbox').press('Enter')
    await page.getByRole('link', { name: 'Oma sivu' }).click()
    await page.getByRole('link', { name: 'Lineaarialgebra ja' }).click()
    await page.getByRole('button', { name: 'Kurssin tavoitematriisi' }).click()
    await page.getByRole('button', { name: 'Muokkaa matriisia' }).click()
    // Drag and drop stuff in skill-level 1-2
    await expect(page.locator("[data-testid='matrix-level-10-4']")).toHaveScreenshot('before-first-objective-drag.png')
    await page.locator('#matrix-objective-80').hover()
    await page.mouse.down()
    await page.mouse.move(0, 0) // this triggers "dragover"-event
    await page.mouse.move(0, 0) // https://playwright.dev/docs/input#dragging-manually
    await page.locator('#matrix-objective-81').hover()
    await page.mouse.up()
    await expect(page.locator("[data-testid='matrix-level-10-4']")).toHaveScreenshot('after-first-objective-drag.png')

    // Drag and drop stuff in skill-level 5
    await expect(page.locator("[data-testid='matrix-level-10-6']")).toHaveScreenshot('before-second-objective-drag.png')
    await page.locator('#matrix-objective-86').dragTo(page.locator('#matrix-objective-84'))
    await page.locator('#matrix-objective-86').hover()
    await page.mouse.down()
    await page.mouse.move(0, 0) // this triggers "dragover"-event
    await page.mouse.move(0, 0) // https://playwright.dev/docs/input#dragging-manually
    await page.locator('#matrix-objective-84').hover()
    await page.mouse.up()
    await expect(page.locator("[data-testid='matrix-level-10-6']")).toHaveScreenshot('after-second-objective-drag.png')
  })
})
