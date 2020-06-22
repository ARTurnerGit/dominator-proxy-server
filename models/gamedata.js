const axios = require("axios");
const { JSDOM } = require("jsdom");

exports.scrapeTerritoriesAndMapData = ({ gameNumber }) => {
  const baseURL = "https://dominating12.com/game/";

  return axios.get(baseURL + gameNumber).then((axiosResponse) => {
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
          troops: 3,
          xpos,
          ypos,
          highlighted: false,
        };
      });
    return { territories, map };
  });
};
