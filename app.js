const express = require("express");
const { setHeader } = require("./middleware/setHeader");
const { getGameData, getGreeting } = require("./controllers/gameData");

const app = express();
app.use(express.json());
app.use(setHeader);

app.get("/", getGreeting);
app.get("/:gameNumber", getGameData);

module.exports = app;
