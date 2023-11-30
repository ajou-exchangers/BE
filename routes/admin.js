const express = require("express");
const router = express.Router();
const {createLocation, updateLocation, acceptAddLocation, rejectAddLocation, deleteLocation, getNotAcceptedLocations} = require("../controller/admin");

router.post("/locations",createLocation);
router.put("/locations/:id",updateLocation);
router.delete("/locations/:id",deleteLocation);
router.put("/locations-add/:id",acceptAddLocation);
router.delete("/locations-add/:id",rejectAddLocation);
router.get("/locations",getNotAcceptedLocations);

module.exports = router;