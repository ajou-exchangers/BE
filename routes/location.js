const express = require("express");
const {applyLocation, readLocations, readLocation} = require("../controller/location");
const {checkAuthenticated} = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/",readLocations)
router.post("/",checkAuthenticated,applyLocation);
router.get("/:id",readLocation);


module.exports = router;