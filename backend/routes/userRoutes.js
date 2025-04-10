const express = require("express");
const router = express.Router();
const { findoneuser , findusers , updateuser , deleteuser } = require("../controllers/userController");

router.get("/", findusers);
router.get("/:user_id", findoneuser);
router.put("/:user_id", updateuser);
router.delete("/:user_id", deleteuser);

module.exports = router;