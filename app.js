const express = require("express");
const { setHeader } = require("./middleware/setHeader");
const gameNumberRouter = require("./routers/gameNumber");
const otherRouter = require("./routers/other");

const app = express();
app.use(express.json());
app.use(setHeader);

app.use("/:gameNumber", gameNumberRouter);
app.use("*", otherRouter);

module.exports = app;
