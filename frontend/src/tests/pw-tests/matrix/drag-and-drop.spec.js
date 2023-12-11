import { test, expect } from '@playwright/test'

test.describe('Drag and Drop', () => {
  test('Drag and Drop - Matrix', async ({ page }) => {
    await page.goto('http://localhost:8080/')
    await page.getByRole('textbox').click()
    await page.getByRole('textbox').fill('terhit')
    await page.getByRole('textbox').press('Enter')
    await page.getByRole('link', { name: 'Oma sivu' }).click()
    await page.getByRole('link', { name: 'Lineaarialgebra ja' }).click()
    await page.getByRole('button', { name: 'Kurssin tavoitematriisi' }).click()
    await page.getByRole('button', { name: 'Muokkaa matriisia' }).click()
    // Drag and drop stuff in skill-level 1-2
    await expect(page.locator("[data-testid='matrix-level-container-10-4']").nth(0)).toContainText(
      'Osaan muokata yhtälöryhmää vastaavan matriisin alkeisrivitoimituksilla redusoiduksi porrasmatriisiksi',
    )
    await expect(page.locator("[data-testid='matrix-level-container-10-4']")).toHaveScreenshot(
      'before-first-objective-drag.png',
    )
    await page.locator('#matrix-objective-80').hover()
    await page.mouse.down()
    await page.mouse.move(0, 0) // this triggers "dragover"-event
    await page.mouse.move(0, 0) // https://playwright.dev/docs/input#dragging-manually
    await page.locator('#matrix-objective-81').hover()
    await page.mouse.up()
    await expect(page.locator("[data-testid='matrix-level-container-10-4']").nth(0)).toContainText(
      'Osaan päätellä yhtälöryhmän ratkaisut redusoidusta porrasmatriisista',
    )
    await expect(page.locator("[data-testid='matrix-level-container-10-4']")).toHaveScreenshot(
      'after-first-objective-drag.png',
    )

    // Drag and drop stuff in skill-level 5
    await expect(page.locator("[data-testid='matrix-level-container-10-6']").nth(0)).toContainText(
      'Osaan käyttää yhtälöryhmiä käytännön ongelmien mallintamiseen',
    )
    await expect(page.locator("[data-testid='matrix-level-container-10-6']")).toHaveScreenshot(
      'before-second-objective-drag.png',
    )
    await page.locator('#matrix-objective-86').dragTo(page.locator('#matrix-objective-84'))
    await page.locator('#matrix-objective-86').hover()
    await page.mouse.down()
    await page.mouse.move(0, 0) // this triggers "dragover"-event
    await page.mouse.move(0, 0) // https://playwright.dev/docs/input#dragging-manually
    await page.locator('#matrix-objective-84').hover()
    await page.mouse.up()
    await expect(page.locator("[data-testid='matrix-level-container-10-6']").nth(0)).toContainText(
      'Tunnen yhtälöryhmän kerroinmatriisin kääntyvyyden yhteyden yhtälöryhmän ratkaisujen lukumäärään',
    )
    await expect(page.locator("[data-testid='matrix-level-container-10-6']")).toHaveScreenshot(
      'after-second-objective-drag.png',
    )
  })

  test('Drag and Drop - Types', async ({ page }) => {
    await page.goto('http://localhost:8080/')
    await page.getByRole('textbox').click()
    await page.getByRole('textbox').fill('terhit')
    await page.getByRole('textbox').press('Enter')
    await page.getByRole('link', { name: 'Oma sivu' }).click()
    await page.getByRole('link', { name: 'Lineaarialgebra ja' }).click()
    await page.getByRole('button', { name: 'Kurssin tavoitematriisi' }).click()
    await page.getByRole('button', { name: 'Muokkaa matriisia' }).click()
    await page.getByRole('link', { name: 'Tyypit' }).click()

    // Drag and drop stuff in type "Viikko"
    await page.waitForTimeout(200)
    const typeList = await page.locator("[data-testid='type-list-3'] > div").nth(0)
    await expect(typeList).toHaveId('type-11')
    await expect(typeList).toHaveScreenshot('before-first-type-drag.png')
    await page.locator('#type-11').hover()
    await page.mouse.down()
    await page.mouse.move(0, 0) // this triggers "dragover"-event
    await page.mouse.move(0, 0) // https://playwright.dev/docs/input#dragging-manually
    await page.locator('#type-12').hover()
    await page.mouse.up()
    await expect(typeList).toHaveId('type-12')
    await expect(typeList).toHaveScreenshot('after-first-type-drag.png')

    // Drag and drop stuff in type "Sarja"

    const typeList2 = await page.locator("[data-testid='type-list-4'] > div").nth(0)

    await expect(typeList2).toHaveId('type-18')
    await expect(typeList2).toHaveScreenshot('before-second-type-drag.png')
    await page.locator('#type-18').hover()
    await page.mouse.down()
    await page.mouse.move(0, 0) // this triggers "dragover"-event
    await page.mouse.move(0, 0) // https://playwright.dev/docs/input#dragging-manually
    await page.locator('#type-19').hover()
    await page.mouse.up()
    await expect(typeList2).toHaveId('type-19')
    await expect(typeList2).toHaveScreenshot('after-second-type-drag.png')
  })

  test('Drag and Drop - TypeList', async ({ page }) => {
    await page.goto('http://localhost:8080/')
    await page.getByRole('textbox').click()
    await page.getByRole('textbox').fill('terhit')
    await page.getByRole('textbox').press('Enter')
    await page.getByRole('link', { name: 'Oma sivu' }).click()
    await page.getByRole('link', { name: 'Lineaarialgebra ja' }).click()
    await page.getByRole('button', { name: 'Kurssin tavoitematriisi' }).click()
    await page.getByRole('button', { name: 'Muokkaa matriisia' }).click()

    await page.getByRole('link', { name: 'Tyypit' }).click()

    const typeList = await page.locator("[data-testid='header-list'] > div > div > div > div").nth(0)

    // Drag and drop stuff in type "Viikko"
    await expect(typeList).toHaveAttribute('data-testid', 'type-header-3')
    await expect(page.locator("[data-testid='header-list']")).toHaveScreenshot('before-first-type-list-drag.png')
    await page.locator("[data-testid='type-header-3']").hover()
    await page.mouse.down()
    await page.mouse.move(0, 0) // this triggers "dragover"-event
    await page.mouse.move(0, 0) // https://playwright.dev/docs/input#dragging-manually
    await page.locator("[data-testid='type-header-4']").hover()
    await page.mouse.up()
    await expect(typeList).toHaveAttribute('data-testid', 'type-header-4')
    await expect(page.locator("[data-testid='header-list']")).toHaveScreenshot('after-first-type-list-drag.png')
  })
})
