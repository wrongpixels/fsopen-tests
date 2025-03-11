
const userLogin = {
    username: 'admin',
    name: 'John Johnson',
    password: 'supersafe'
}
const note = 'Sooo this is a new note'
const login = async (page, loginData) => {
    await page.getByText('Show Login').click()
    await page.getByTestId('username').fill(loginData.username)
    await page.getByTestId('password').fill(loginData.password)
    return await page.getByRole('button', {name:'Sign in'}).click()
}
const addNote = async (page, content = '') => {
    await page.getByTestId('note-content').fill(content?content:note)
    await page.getByRole('button', {name: 'Add'}).click()
    return await page.getByText(note)
}

module.exports = {userLogin, login, addNote}