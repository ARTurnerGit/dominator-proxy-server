const express = require("express");
const { setHeader } = require("./middleware/setHeader");
const { getGameData } = require("./controllers/gameData");

const app = express();
app.use(express.json());
app.use(setHeader);

app.get("/:gameNumber", getGameData);

module.exports = app;
