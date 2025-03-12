const { test, describe, beforeEach, expect } = require('@playwright/test')
const {login, addNote, userLogin} = require('./helper')
const FrontURL = ''
const resetURL = `${FrontURL}api/testing/reset`

beforeEach(async ({page, request}) => {
    await request.post(resetURL)
    await request.post(`${FrontURL}/api/users`, {data: userLogin})
    await page.goto(FrontURL)
})

describe('Note app', () => {
    test('front page can be indeed opened', async ({page}) => {
        const locator = await page.getByText('Notes')
        await expect(locator).toBeVisible()
        await expect(page.getByText('Note app, Department of WTF of Helsinki')).toBeVisible()
        })
    test('user can login', async ({page}) => {
        await login(page)
        await expect(page.getByText(`Welcome back, ${userLogin.name}!`)).toBeVisible()
    })
    test('yet login fails if password is wrong', async ({page}) => {
        await login(page, {...userLogin, password: 'wat'})
        const errorDiv = await page.locator('.error')
        await expect(errorDiv).toContainText('Wrong user or password')
        await expect(errorDiv).toHaveCSS('border-style', 'solid')
        await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')
        await expect(page.getByText(`Welcome back, ${userLogin.name}!`)).not.toBeVisible()
    })

    describe('when logged in', () => {
        beforeEach(async ({page}) => await login(page))

        test('can create a new note', async ({page}) => {
            await expect(await addNote(page)).toBeVisible()
        })

        test('can toggle importance of a note', async ({page}) => {
            await addNote(page)
            await page.getByRole('button', {name: 'Set important'}).click()
            const button = await page.getByRole('button', {name: 'Set not important'})
            await expect(button).toBeVisible()
            await button.click()
            await expect(page.getByRole('button', {name: 'Set important'})).toBeVisible()
        })
    })
})
