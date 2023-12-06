const express = require("express");
const router = express.Router();
const {acceptAddLocation, rejectAddLocation, deleteLocation, getNotAcceptedLocations} = require("../controllers/adminController");

router.delete("/locations/:id",deleteLocation);
router.put("/locations-add/:id",acceptAddLocation);
router.delete("/locations-add/:id",rejectAddLocation);
router.get("/locations",getNotAcceptedLocations);

module.exports = router;