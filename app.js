const express = require("express");
const { setHeader } = require("./middleware/setHeader.js");
const { getGameData, getGreeting } = require("./controllers/gameData.js");

const app = express();
app.use(express.json());
app.use(setHeader);

app.get("/", getGreeting);
app.get("/:gameNumber", getGameData);

module.exports = app;
