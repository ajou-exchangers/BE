const express = require("express");
const locationController = require("../controllers/locationController");
const {checkAuthenticated} = require("../middlewares/authMiddleware");
const upload = require("../middlewares/s3Middleware");
const router = express.Router();

router.get("/",locationController.readLocations)
router.post("/",checkAuthenticated,upload.single("image"),locationController.applyLocation)
router.get("/:id",locationController.readLocation);

module.exports = router;