const {
  scrapeTerritoriesAndMapData,
  scrapeGamelogAndPlayerColours,
} = require("../models/gamedata.js");

exports.getGreeting = (req, res, next) => {
  res
    .status(200)
    .json({ msg: "welcome to the dominating 12 visualiser proxy server" });
};

exports.getGameData = (req, res, next) => {
  const promises = [
    scrapeTerritoriesAndMapData(req.params),
    scrapeGamelogAndPlayerColours(req.params),
  ];

  Promise.all(promises)
    .then(([{ territories, map }, { gamelog, players }]) => {
      res.status(200).json({ territories, map, gamelog, players });
    })
    .catch((err) => {
      res
        .status(500)
        .send({ msg: "probably an issue with the proxy server", err });
    });
};
