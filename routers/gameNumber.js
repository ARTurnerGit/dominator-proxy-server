const gameNumberRouter = require("express").Router();
const { getAllTerritories } = require("../controllers/gamedata");

gameNumberRouter.route("/territories").get(getAllTerritories);
gameNumberRouter.route("/players").get();
gameNumberRouter.route("/map").get();
gameNumberRouter.route("/gamelog").get();

module.exports = gameNumberRouter;
