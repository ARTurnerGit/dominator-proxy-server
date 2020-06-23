const {
  scrapeTerritories,
  scrapeTerritoriesAndMapData,
  scrapeGamelogAndPlayerColours,
} = require("../models/gamedata.js");

exports.getAllTerritories = (req, res, next) => {
  scrapeTerritories(req)
    .then((territories) => res.status(200).json({ territories }))
    .catch((err) => {
      res
        .status(500)
        .send({ msg: "probably an issue with the proxy server", err });
    });
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
