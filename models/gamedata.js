const axios = require("axios");
const { JSDOM } = require("jsdom");

exports.scrapeTerritories = ({ baseUrl }) => {
  const dominating12 = "https://dominating12.com/game";
  return axios.get(dominating12 + baseUrl).then(({ data }) => {
    const { document } = new JSDOM(data).window;
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
    return territories;
  });
};

exports.scrapeMap = ({ baseUrl }) => {
  const dominating12 = "https://dominating12.com/game";
  return axios.get(dominating12 + baseUrl).then(({ data }) => {
    const { document } = new JSDOM(data).window;
    let mapStyle = document.getElementById("map").style;
    let map = {
      url: mapStyle.backgroundImage.slice(4, -1),
      width: mapStyle.width,
      height: mapStyle.height,
    };
    return map;
  });
};

exports.scrapePlayers = ({ baseUrl }) => {
  const dominating12 = "https://dominating12.com/game";
  return axios.get(dominating12 + baseUrl).then(({ data }) => {
    const { document } = new JSDOM(data).window;
    let players = {};
    let numberOfPlayers = document.getElementsByClassName("player-list")[0]
      .childNodes[1].childElementCount;

    for (let i = 1; i <= numberOfPlayers; i++) {
      let playerName = document
        .querySelector(`#playerrow-${i} .name`)
        .textContent.trim();

      players[playerName] = {
        colour:
          "player-" +
          document
            .querySelector(`#playerrow-${i} .color img`)
            .src.slice(-5, -4),
        playerURL: document.querySelector(`#playerrow-${i} .name a`).href,
        cards: 0,
        territories: 0,
        troops: 0,
        hidden: false,
      };
    }

    return players;
  });
};

exports.scrapeGamelog = ({ baseUrl }) => {
  const requestURL = `https://dominating12.com/game${baseUrl}/play/load-full-log?before=1000000000`;

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
      return gamelog;
    });
};
