const gameNumberRouter = require("express").Router();
const {
  getAllTerritories,
  getMap,
  getAllPlayers,
  getGamelog,
} = require("../controllers/gamedata");

gameNumberRouter.route("/territories").get(getAllTerritories);
gameNumberRouter.route("/map").get(getMap);
gameNumberRouter.route("/players").get(getAllPlayers);
gameNumberRouter.route("/gamelog").get(getGamelog);

module.exports = gameNumberRouter;
