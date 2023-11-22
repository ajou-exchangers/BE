const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
	res.send("♡  (\\⑅/)  ♡\nฅ꒰ ⸝˶• ﻌ•˶⸝꒱ฅ");
});

module.exports = router;
