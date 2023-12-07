const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const {checkAdminAuthenticated} = require("../middlewares/adminMiddleware");
const {checkNotAuthenticated} = require("../middlewares/authMiddleware");

router.delete("/locations/:id", adminController.deleteLocation);
router.put("/locations-add/:id", adminController.acceptAddLocation);
router.delete("/locations-add/:id", adminController.rejectAddLocation);
router.get("/locations", checkAdminAuthenticated, adminController.getNotAcceptedLocations);
router.get("/locations/:id", checkAdminAuthenticated, adminController.getNotAcceptedLocation);
router.post("/login", checkNotAuthenticated, adminController.adminLogin)

module.exports = router;