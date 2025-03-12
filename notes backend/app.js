const express = require("express");
const cors = require("cors")
const middleware = require("./utils/middleware")
const config = require("./utils/config")
require("express-async-errors")
const notesRouter = require("./controllers/notes")
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const mongoose = require("mongoose")
const logger = require("./utils/logger")

mongoose.connect(config.MONGODB_URL).then(res => {
    logger.info("Connected to MongoDB");
}).catch(error => logger.error("Error connecting to MongoDB", error.message));

mongoose.set('strictQuery', false);

const app = express();
app.use(express.json());
app.use(middleware.requestLogger);
app.use(cors());
app.use(express.static('dist'));
app.use('/api/login', loginRouter)
app.use('/api/notes', notesRouter)
app.use('/api/users', usersRouter)
if (process.env.NODE_ENV === 'test')
{
    console.log('fuck you moron')
    const testingRouter = require('./controllers/testing')
    app.use('/api/testing', testingRouter)
}
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler);

module.exports = app;