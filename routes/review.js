const express = require("express");
const {writeReview, updateReview, getReviews, getReviewsByLocation, deleteReview} = require("../controllers/reviewController");
const router = express.Router();
const {checkAuthenticated} = require("../middlewares/authMiddleware");

// router.post("/:locationId",checkAuthenticated,writeReview); // 테스트를 위해 인증이 없는 리뷰 등록으로 배포
router.post("/:locationId",writeReview);
router.put("/:id",updateReview);
router.get("/:locationId",getReviewsByLocation)
router.get("/",getReviews);
router.delete("/:id",deleteReview);

module.exports = router;