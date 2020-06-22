const axios = require("axios");
const { JSDOM } = require("jsdom");

exports.scrapeTerritoriesAndMapData = ({ gameNumber }) => {
  const baseURL = "https://dominating12.com/game/";

  return axios.get(baseURL + gameNumber).then(({ data }) => {
    const { document } = new JSDOM(data).window;

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
          troops: 3,
          xpos,
          ypos,
          highlighted: false,
        };
      });
    return { territories, map };
  });
};

exports.scrapeGamelogAndPlayerColours = ({ gameNumber }) => {
  const requestURL = `https://dominating12.com/game/${gameNumber}/play/load-full-log?before=1000000000`;

  return axios
    .post(requestURL, {}, { responseType: "json", responseEncoding: "utf8" })
    .then(({ data }) => {
      let gamelog = [];
      let players = {};

      try {
        Object.values(data.log).forEach((HTMLString) => {
          const { document } = new JSDOM(HTMLString).window;
          let message = document
            .querySelector(".chat-message-body")
            .textContent.trim();
          gamelog.push(message);
        });
      } catch (err) {
        console.log(err);
      }
      return { gamelog, players };
    });
};
