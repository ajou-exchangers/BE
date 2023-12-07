const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const {checkAdminAuthenticated} = require("../middlewares/adminMiddleware");
const {checkNotAuthenticated} = require("../middlewares/authMiddleware");

router.delete("/locations/:id",checkAdminAuthenticated, adminController.deleteLocation);
router.put("/locations-add/:id",checkAdminAuthenticated, adminController.acceptAddLocation);
router.delete("/locations-add/:id",checkAdminAuthenticated, adminController.rejectAddLocation);
router.get("/locations", checkAdminAuthenticated, adminController.getNotAcceptedLocations);
router.get("/locations/:id", checkAdminAuthenticated, adminController.getNotAcceptedLocation);
router.post("/login", checkNotAuthenticated, adminController.adminLogin)
router.get("/locations-update", checkAdminAuthenticated, adminController.getUpdateLocations);
router.put("/locations-update/:id",checkAdminAuthenticated, adminController.updateLocation);
router.delete("/locations-update/:id",checkAdminAuthenticated, adminController.rejectLocationUpdate);

module.exports = router;