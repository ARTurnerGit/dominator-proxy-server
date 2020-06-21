const express = require("express");
const axios = require("axios");
const { JSDOM } = require("jsdom");

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/:gameNumber", (req, res) => {
  const { gameNumber } = req.params;
  const baseURL = "https://dominating12.com/game/";

  axios
    .get(baseURL + gameNumber)
    .then((axiosResponse) => {
      const { document } = new JSDOM(axiosResponse.data).window;

      let mapStyle = document.getElementById("map").style;
      let map = {
        url: mapStyle.backgroundImage.slice(4, -1),
        width: mapStyle.width,
        height: mapStyle.height,
      };

      let territories = {};
      document
        .querySelector("#map")
        .querySelectorAll("a")
        .forEach((element) => {
          let name = element.getAttribute("data-name");
          let xpos = element.getAttribute("data-x");
          let ypos = element.getAttribute("data-y");
          territories[name] = {
            owner: "",
            territories: 3,
            xpos,
            ypos,
            highlighted: false,
          };
        });

      res.json({ territories, map });
    })
    .catch((err) => {
      res
        .status(500)
        .send({ msg: "probably an issue with the proxy server", err });
    });
});

const PORT = process.env.PORT || 9090;
app.listen(PORT, console.log(`listening on ${PORT}...`));
