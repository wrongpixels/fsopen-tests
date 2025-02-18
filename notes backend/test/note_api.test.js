const {test, beforeEach, after} = require("node:test")
const assert = require("node:assert")
const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const Note = require("../models/note")
const User = require('../models/user')
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
    const users = await User.find({})
    console.log('Usuarios disponibles:', users)

    const newNote = {
        content: "Such a new note",
        important: false,
        userId: users[0].id
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

test.only('a specific note can be viewed', async () => {
    const allNotes = await getAllNotesInDB()
    const firstNote = allNotes[0]
    const firstNoteByCall = await api
        .get(`/api/notes/${firstNote.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    assert.deepStrictEqual(firstNote, firstNoteByCall.body)
})

test.only('a note can be deleted', async () => {
    const allNotes = await getAllNotesInDB()
    const noteToDelete = allNotes[0]
    await api
        .delete(`/api/notes/${noteToDelete.id}`)
        .expect(204)

    const notesAtEnd = await getAllNotesInDB()
    const noteExists = await notesAtEnd.find(n => n.content === noteToDelete.content)
    assert(!noteExists)
    assert.strictEqual(notesAtEnd.length, allNotes.length-1)

})

after(async () => {
    await mongoose.connection.close()
})