require("dotenv").config();
const express = require("express");
const cors = require("cors");
const Note = require("./models/note")

const requestLogger = (req, res, next) =>{
    console.log('Method', req.method);
    console.log('Path', req.path);
    console.log("Body", req.body);
    console.log("--------")
    next();
}

const unknownEndpoint  = (req, res) => {
    res.status(404).json({"Error": "Bad request"});
}

let notes = [
    {
        id: "1",
        content: "HTML is easy",
        important: true
    },
    {
        id: "2",
        content: "Browser can execute only JavaScript",
        important: false
    },
    {
        id: "3",
        content: "GET and POST are the most important methods of HTTP protocol",
        important: true
    },
    {
        id: "4",
        content: "PENE. López. CRUUUUZ",
        important: true
    }
]

const PORT = process.env.PORT || 3001;
const app = express();
const getID = () =>  notes.length === 0?"1":String(Math.max(...notes.map(note => Number(note.id))) + 1);
app.use(express.json());
app.use(requestLogger);
app.use(cors());
app.use(express.static('dist'));
app.post("/api/notes", (request, response) => {
    const body = request.body;
    if (!body.content)
    {
        return response.status(400).json({"Error": "Note content can't be empty"});
    }
    const note = new Note({content: body.content, important: Boolean(body.important) || false});
    note.save().then(newNote => response.json(newNote)).catch(error => response.json({"Error": "Couldn't create note"}));
});

app.get('/', (request, response) => {
    response.send("<h1>Hello Planet!</h1>");
})
app.get("/bye", (request, response) => {
    response.send("<h1>Bye, World!</h1>");
})
app.get("/api/notes", (request, response) =>{
    //response.json(notes);
    Note.find({}).then(result => {
        response.json(result);
       // mongoose.connection.close();
    }
);
})
app.get("/api/notes/:id", (request, response) => {
    const id = request.params.id;
    //const note = notes.find(note => note.id === id)
    Note.findById(id).then(found => response.json(found)).catch(error =>
        response.status(404).json({"Error":`Note ${id} was not found in server`}))
})
app.delete("/api/notes/:id", (request, response) => {
    const id = request.params.id;
    Note.findByIdAndDelete(id).then(result => {
        if (!result)
        {
            return response.status(404).json({"Error": "Note not found!"})
        }
        response.status(204).end();
    }).catch(error => response.status(404).json({"Error":"Note not found"}));

   /* if (note)
    {
        notes = notes.filter(_note => _note !== note)
        response.status(204).end();
    }
    else
    {
        response.status(404).json("Note not found");
    }*/
})
app.put("/api/notes/:id", (req, res) => {
    const body = req.body;
    if (!body)
    {
        return res.status(400).json({"Error": "Not was empty"})
    }
    const id = req.params.id;
    Note.findByIdAndUpdate(id, body, {new: true}).then(found => {
        console.log("Updating note");
        res.json(found)
    }).catch(error =>
        res.status(404).json({"Error":`Note ${id} was not found in server`}))
})
app.use(unknownEndpoint);
const getNoteByID = (id) => notes.find(note => note.id === id);

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
