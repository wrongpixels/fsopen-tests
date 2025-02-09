const express = require("express");
const cors = require("cors")
const middleware = require("./utils/middleware")
const config = require("./utils/config")
const router = require("./controllers/notes")
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
app.use('/api', router);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;