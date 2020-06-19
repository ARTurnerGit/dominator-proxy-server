const express = require("express");
const axios = require("axios");

const app = express();

const PORT = process.env.PORT || 9090;
app.listen(PORT, console.log(`listening on ${PORT}...`));
