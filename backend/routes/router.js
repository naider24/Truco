const router = require("express").Router();

const roomsRouter = require("./rooms");


router.use("/", roomsRouter,) ;



module.exports = router;