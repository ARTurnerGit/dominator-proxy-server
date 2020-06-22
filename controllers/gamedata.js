const { scrapeTerritoriesAndMapData } = require("../models/gameData");

exports.getGameData = (req, res, next) => {
  scrapeTerritoriesAndMapData(req.params)
    .then((obj) => {
      res.status(200).json(obj);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ msg: "probably an issue with the proxy server", err });
    });
};
