const gameNumberRouter = require("express").Router();
const { getAllTerritories, getMap } = require("../controllers/gamedata");

gameNumberRouter.route("/territories").get(getAllTerritories);
gameNumberRouter.route("/map").get(getMap);
gameNumberRouter.route("/players").get();
gameNumberRouter.route("/gamelog").get();

module.exports = gameNumberRouter;
