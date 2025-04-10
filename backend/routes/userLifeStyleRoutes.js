const express = require("express");
const router = express.Router();
const { findUserLifeStyle, createUserLifeStyle, editUserLifeStyle } = require("../controllers/userLifeStyleController");

router.get("/:user_id", findUserLifeStyle);
router.post("/:user_id", createUserLifeStyle);
router.put("/:user_id", editUserLifeStyle);

module.exports = router;
