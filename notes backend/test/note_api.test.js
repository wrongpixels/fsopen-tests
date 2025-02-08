const {test, after} = require("node:test")
const strictEqual = require("node:assert").strictEqual
const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")

const api = supertest(app)

const getNotes = async (id = 0) => {
    if (id === 0)
    {
        return api.get('/api/notes')
    }
    return api.get(`/api/notes/${id}`)
}
test('notes are returned as json', async () => {
    await api.get('/api/notes').expect(200).expect('Content-Type', /application\/json/)
})

test('there are 2 notes', async () => {
    const response = await getNotes()
    strictEqual(response.body.length, 2)
})

test('the first note is about HTTP methods', async () => {
    const notes = await getNotes();
    const contents = notes.body.map(note => note.content);
    strictEqual(contents[0].includes('HTML is easy'), true)
})

after(async () => {
    await mongoose.connection.close()
})