const express = require("express");
const router = express.Router();
const{ findAllLifeStyle , findCategoryLifeStyle} = require("../controllers/lifeStyleController");

router.get("/" , findAllLifeStyle);
router.get("/:category_id" , findCategoryLifeStyle);

module.exports = router;