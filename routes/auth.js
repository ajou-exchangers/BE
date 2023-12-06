const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const {
	checkNotAuthenticated,
	checkAuthenticated,
} = require("../middlewares/authMiddleware");
const upload = require("../middlewares/s3Middleware");

router.post(
	"/signup",
	checkNotAuthenticated,
	upload.single("profile"),
	authController.signupUser
);
router.post(
	"/signin",
	checkNotAuthenticated,
	upload.none(),
	authController.loginUser
);
router.post("/signout", checkAuthenticated, authController.logoutUser);
router.get("/check-nickname/:nickname", authController.checkNicknameDup);

module.exports = router;
