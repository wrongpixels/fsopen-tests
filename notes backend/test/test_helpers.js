const Note = require("../models/note")

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

const nonExistingID = async () => {
    const placeHolderNote = new Note({content: "will be gone soon", important: false})
    await placeHolderNote.save()
    await placeHolderNote.deleteOne()
    return placeHolderNote._id.toString()
}

const getAllNotesInDB = async () => {
    const notes = await Note.find({})
    return notes.map(n => n.toJSON())
}

module.exports = {nonExistingID, getAllNotesInDB, initialNotes}