const express = require("express");
const app = express();
const cors = require("cors");
const middleware = require("./utils/middleware");
const blogRouter = require("./controllers/blog");
const mongoose = require("mongoose");
const config = require("./utils/config");
const logger = require("./utils/logger");

logger.info("connecting to", config.MONGODB_URI);

mongoose
    .connect(config.MONGODB_URI)
    .then(() => {
        logger.info("connected to MongoDB");
    })
    .catch((error) => {
        logger.error("error connection to MongoDB:", error.message);
    });

app.use(cors());
app.use(express.json());

app.use(middleware.requestLogger);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use("/api", blogRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
