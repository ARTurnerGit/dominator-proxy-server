const {
  scrapeTerritoriesAndMapData,
  scrapeGamelog,
} = require("../models/gameData");

exports.getGameData = (req, res, next) => {
  const promises = [
    scrapeTerritoriesAndMapData(req.params),
    scrapeGamelogAndPlayerColours(req.params),
  ];

  Promise.all(promises)
    .then(([{ territories, map }]) => {
      res.status(200).json({ territories, map });
    })
    .catch((err) => {
      res
        .status(500)
        .send({ msg: "probably an issue with the proxy server", err });
    });
};
