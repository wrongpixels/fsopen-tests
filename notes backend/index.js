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

const errorHandler = (error, req, res, next) =>{
    //console.log(error);
    console.log("Hello?");
    let handledError = null;
    if (error.name === "CastError")
    {
        handledError = "Note ID is in the wrong format.";
    }
    if (error.name === "ValidationError")
    {
        handledError = error.message;
    }
    if (handledError)
    {
        return res.status(400).json({Error: handledError});
    }
    next (error);
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
app.post("/api/notes", (request, response, next) => {
    const body = request.body;
    if (!body.content)
    {
        return response.status(400).json({"Error": "Note content can't be empty"});
    }
    const note = new Note({content: body.content, important: Boolean(body.important) || false});
    note.save().then(newNote => response.json(newNote)).catch(error => next(error));
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

const handleResponse = (resp, found, code = -1) => {
    if (!resp)
    {
        return;
    }
    if (!found)
    {
        return resp.status(404).json({"Error":"Couldn't be found."})
    }
    if (code !== -1)
    {
        return resp.status(code).end();
    }
    return resp.json(found);
}
app.get("/api/notes/:id", (request, response, next) => {
    const id = request.params.id;
    Note.findById(id).then(found => handleResponse(response, found)).catch(error => {
        console.log("Hello 0");
        next(error)
    })
    }
)
app.delete("/api/notes/:id", (request, response, next) => {
    const id = request.params.id;
    Note.findByIdAndDelete(id).then(result => handleResponse(response, result, 204)).catch(error => next(error));

})
app.put("/api/notes/:id", (req, res, next) => {
    const body = req.body;
    if (!body)
    {
        return res.status(400).json({"Error": "Note was empty"})
    }
    const id = req.params.id;
    Note.findByIdAndUpdate(id, body, {new: true, runValidators: true, context: 'query'}).then(found => handleResponse(res, found)).catch(error =>
        next(error))
})
app.use(unknownEndpoint);
app.use(errorHandler);

const getNoteByID = (id) => notes.find(note => note.id === id);

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
