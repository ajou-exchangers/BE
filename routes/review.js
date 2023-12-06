const express = require("express");
const reviewController = require("../controllers/reviewController");
const router = express.Router();
const {checkAuthenticated} = require("../middlewares/authMiddleware");
const upload = require("../middlewares/s3Middleware");

router.post("/:locationId",checkAuthenticated, upload.array("images"), reviewController.writeReview);
router.put("/:id",checkAuthenticated, upload.array("images"), reviewController.updateReview);
router.get("/:locationId", reviewController.getReviewsByLocation)
router.get("/", reviewController.getReviews);
router.delete("/:id",checkAuthenticated, reviewController.deleteReview);

module.exports = router;