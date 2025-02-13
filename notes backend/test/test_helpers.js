const Note = require("../models/note")
const User = require('../models/user')

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

const getAllUsersInDB = async () => {
    const allUsers = await User.find({})
    return allUsers.map(u => u.toJSON())
}

const newUserData = {
    username: 'mluukkai',
    name: 'Matti Luukkainen',
    password: '1234'
}

module.exports = {nonExistingID, getAllNotesInDB, getAllUsersInDB, newUserData, initialNotes}