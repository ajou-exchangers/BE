const express = require("express");
const KeywordController = require("../controllers/keywordController");
const router = express.Router();

router.post("/",KeywordController.createKeyword);
router.get("/:category",KeywordController.getKeywordByCategory);

module.exports = router;