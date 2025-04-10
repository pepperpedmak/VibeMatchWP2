const express = require("express");
const router = express.Router();
const { likeuser , unlikeuser , findpendinguser } = require("../controllers/matchController");

router.post("/like/:user_id",likeuser);
router.delete("/unlike/:user_id",unlikeuser);
router.get("/pendinguser/:user_id",findpendinguser);

module.exports = router;