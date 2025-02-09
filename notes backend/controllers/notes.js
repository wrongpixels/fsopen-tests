const Note = require("../models/note")
const router = require("express").Router()
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
router.post("/notes", (request, response, next) => {
    const body = request.body;
    if (!body.content)
    {
        return response.status(400).json({"Error": "Note content can't be empty"});
    }
    const note = new Note({content: body.content, important: Boolean(body.important) || false});
    note.save().then(newNote => response.status(201).json(newNote)).catch(error => next(error));
});
router.get("/notes", (request, response) =>{
    //response.json(notes);
    Note.find({}).then(result => {
            response.json(result);
        }
    );
})
router.get("/notes", async (request, response) =>{
    const notes = await Note.find({})
    response.json(notes)
})
router.get("/notes/:id", (request, response, next) => {
        const id = request.params.id;
        Note.findById(id).then(found => handleResponse(response, found)).catch(error => {
            next(error)
        })
    }
)
router.delete("/notes/:id", (request, response, next) => {
    const id = request.params.id;
    Note.findByIdAndDelete(id).then(result => handleResponse(response, result, 204)).catch(error => next(error));

})
router.put("/notes/:id", (req, res, next) => {
    const body = req.body;
    if (!body)
    {
        return res.status(400).json({"Error": "Note was empty"})
    }
    const id = req.params.id;
    Note.findByIdAndUpdate(id, body, {new: true, runValidators: true, context: 'query'}).then(found => handleResponse(res, found)).catch(error =>
        next(error))
})

module.exports = router;