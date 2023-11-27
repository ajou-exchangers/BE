const express = require("express");
const {createKeyword, getKeywordByCategory} = require("../controller/Keyword");
const router = express.Router();

router.post("/",createKeyword);
router.get("/",getKeywordByCategory);

module.exports = router;