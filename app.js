const express = require("express");
const axios = require("axios");

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/:gameNumber", (req, res) => {
  const { gameNumber } = req.params;
  const baseURL = "https://dominating12.com/game/";

  axios
    .get(baseURL + gameNumber)
    .then((axiosResponse) => {
      res.json(axiosResponse.data);
    })
    .catch((err) =>
      res
        .status(500)
        .send({ msg: "probably an issue with the proxy server", err })
    );
});

const PORT = process.env.PORT || 9090;
app.listen(PORT, console.log(`listening on ${PORT}...`));
