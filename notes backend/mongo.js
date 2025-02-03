const mongoose = require("mongoose");

const password = process.argv.length > 2?process.argv[2]:null;

if (!password)
{
    console.log("Please, provide a valid password!");
    process.exit(1);
}
const dataBase = process.argv.length > 3?process.argv[3]:"test";
const url = `mongodb+srv://kevapaereo:${password}@fsopen-2025.voojz.mongodb.net/${dataBase}?retryWrites=true&w=majority&appName=fsopen-2025`;

mongoose.set('strictQuery', false);

mongoose.connect(url);

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean
})

const Note = mongoose.model("Note", noteSchema);
/*
const note = new Note({
    content: "This is yet another test note",
    important: false
});

note.save().then(result => {
    console.log("Note was saved!");
    mongoose.connection.close();
})*/

Note.find({important: true}).then(result => {
    result.forEach(n =>{
        console.log(n);
    })
    mongoose.connection.close();
})