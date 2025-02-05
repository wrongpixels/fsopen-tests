const errorHandler = (error, req, res, next) =>{
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

module.exports = unknownEndpoint;
const requestLogger = (req, res, next) =>{
    console.log('Method', req.method);
    console.log('Path', req.path);
    console.log("Body", req.body);
    console.log("--------")
    next();
}
module.exports = { errorHandler, requestLogger, unknownEndpoint }