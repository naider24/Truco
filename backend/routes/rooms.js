const router = require("express").Router();

const roomController = require("../controllers/roomController");

router.route("/rooms").get((req, res) => roomController.getAll(req, res));

router.route("/rooms").post((req, res) => roomController.create(req, res));

router.route("/rooms/:roomId").put((req, res) => roomController.update(req, res));

router.route("/rooms/:roomId/clear-cards-played").put((req, res) => {
    roomController.clearCardsPlayed(req, res);
  });


  router.route("/rooms/:roomId/points").put((req, res) => roomController.updatePointsAndRoundsWin(req, res));
module.exports = router;