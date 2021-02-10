const {
  scrapeTerritories,
  scrapeMap,
  scrapePlayers,
  scrapeGamelog,
  fetchInitialDistribution,
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

exports.getMap = (req, res, next) => {
  scrapeMap(req)
    .then((map) => res.status(200).json({ map }))
    .catch((err) => {
      res
        .status(500)
        .send({ msg: "probably an issue with the proxy server", err });
    });
};

exports.getAllPlayers = (req, res, next) => {
  scrapePlayers(req)
    .then((players) => res.status(200).json({ players }))
    .catch((err) => {
      res
        .status(500)
        .send({ msg: "probably an issue with the proxy server", err });
    });
};

exports.getGamelog = (req, res, next) => {
  scrapeGamelog(req)
    .then((gamelog) => res.status(200).json({ gamelog }))
    .catch((err) => {
      res
        .status(500)
        .send({ msg: "probably an issue with the proxy server", err });
    });
};

exports.getInitialDistribution = (req, res, next) => {
  return fetchInitialDistribution(req)
    .then(({ data }) => res.status(200).json(data))
    .catch((err) => res.status(500).send({ msg: "working on it" }));
};
