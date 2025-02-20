const logger = require("../utils/logger")
const errorHandler = (error, req, res, next) =>{
    let handledError = null
    let errorCode = 400
    logger.error(error.message)
    if (error.name === "CastError")
    {
        handledError = "Note ID is in the wrong format.";
    }
    else if (error.name === "ValidationError")
    {
        handledError = error.message;
    }
    else if (error.name === "MongoServerError" && error.message.includes("duplicate key error"))
    {
         handledError = 'expected `username` to be unique'
    }
    else if(error.name === 'JsonWebTokenError')
    {
        handledError = 'invalid token'
        errorCode = 401
    }
    else if(error.name === 'TokenExpiredError')
    {
        handledError = 'Token expired'
        errorCode = 401
    }
    if (handledError)
    {
        return res.status(errorCode).json({Error: handledError});
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