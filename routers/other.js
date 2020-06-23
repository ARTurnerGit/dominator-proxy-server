const otherRouter = require("express").Router();
const { getGreeting } = require("../controllers/other");

otherRouter.use(getGreeting);

module.exports = otherRouter;
