const {test, beforeEach, after} = require("node:test")
const assert = require("node:assert")
const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const Note = require("../models/note")

const api = supertest(app)

const initialNotes = [
    {
        content: "HTML is easy",
        important: false,
    },
    {
        content: "Browser can execute only JavaScript",
        important: true
    }
]

beforeEach(async () => {
    await Note.deleteMany({})
    for (const note of initialNotes)
    {
        const newNote = new Note(note)
        await newNote.save();
    }
})

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
    assert.strictEqual(response.body.length, initialNotes.length)
})

test('the first note is about HTTP methods', async () => {
    const notes = await getNotes();
    const contents = notes.body.map(note => note.content);
    assert(contents[0].includes('HTML is easy'))
})

after(async () => {
    await mongoose.connection.close()
})