const gameNumberRouter = require("express").Router();
const {
  getAllTerritories,
  getMap,
  getAllPlayers,
  getGamelog,
  getInitialDistribution,
} = require("../controllers/gamedata");

gameNumberRouter.route("/territories").get(getAllTerritories);
gameNumberRouter.route("/map").get(getMap);
gameNumberRouter.route("/players").get(getAllPlayers);
gameNumberRouter.route("/gamelog").get(getGamelog);
gameNumberRouter.route("/initialDistribution").get(getInitialDistribution);

module.exports = gameNumberRouter;
