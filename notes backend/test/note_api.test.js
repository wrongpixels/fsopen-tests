const {test, beforeEach, after} = require("node:test")
const assert = require("node:assert")
const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const Note = require("../models/note")
const {initialNotes, getAllNotesInDB, nonExistingID} = require("./test_helpers")

const api = supertest(app)

beforeEach(async () => {
    await Note.deleteMany({})
    for (const note of initialNotes)
    {
        const newNote = new Note(note)
        await newNote.save();
    }
})

const getNotesByHTML = async (id = 0) => {
    if (id === 0)
    {
        return api.get('/api/notes')
    }
    return api.get(`/api/notes/${id}`)
}

test.only('all notes are returned', async () => {
    const allNotes = await getNotesByHTML()
    assert.strictEqual(allNotes.body.length, initialNotes.length)

})
test('notes are returned as json', async () => {
    await api.get('/api/notes')
        .expect('Content-Type', /application\/json/)
})

test('there are 2 notes', async () => {
    const response = await getNotesByHTML()
    assert.strictEqual(response.body.length, initialNotes.length)
})

test.only('a valid note can be added', async () => {

    const newNote = {
        content: "Such a new note",
        important: false
    }
    await api.post('/api/notes')
        .send(newNote)
        .expect(201)
        .expect('Content-type', /application\/json/)
    const newNotes = await getAllNotesInDB()
    const addedNote = newNotes.find(n => n.content === newNote.content)

    assert.strictEqual(initialNotes.length + 1, newNotes.length)
    assert(addedNote)
})

test.only('note without content is not added', async () => {
    const newNote = {
        important: true
    }
    await api.post('/api/notes')
        .send(newNote)
        .expect(400)
    const response = await getAllNotesInDB()
    assert.strictEqual(initialNotes.length, response.length)
})

const findAndThenDelete = () => {
    Note.find([]).then(found => found[0].deleteOne()).then(response => console.log("First note was deleted"))
}

const findAndDeleteAlt = async () => {
   const notes = await Note.find({})
    await notes[0].deleteOne();
   console.log("First note was deleted")

}

test('the first note is about HTTP methods', async () => {
    const notes = await getNotesByHTML();
    const contents = notes.body.map(note => note.content);
    assert(contents[0].includes('HTML is easy'))
})

after(async () => {
    await mongoose.connection.close()
})