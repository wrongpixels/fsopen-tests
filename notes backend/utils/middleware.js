const logger = require("../utils/logger")
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
    if (error.name === "MongoServerError" && error.message.includes("duplicate key error"))
    {
        handledError = 'expected `username` to be unique'
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

const requestLogger = (req, res, next) =>{
    logger.info('Method', req.method);
    logger.info('Path', req.path);
    logger.info("Body", req.body);
    logger.info("--------")
    next();
}
module.exports = { errorHandler, requestLogger, unknownEndpoint }