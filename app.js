const express = require("express");
const axios = require("axios");

const app = express();

app.get("/", (req, res) => {
  res.send(JSON.stringify({ msg: "congratulations, you made it" }));
});

const PORT = process.env.PORT || 9090;
app.listen(PORT, console.log(`listening on ${PORT}...`));
