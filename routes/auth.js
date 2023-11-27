const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const {
	checkNotAuthenticated,
	checkAuthenticated,
} = require("../middlewares/authMiddleware");

router.post("/signup", checkNotAuthenticated, authController.signupUser);
router.post("/signin", checkNotAuthenticated, authController.loginUser);
router.post("/signout", checkAuthenticated, authController.logoutUser);
router.get("/check-nickname/:nickname", authController.checkNicknameDup);

module.exports = router;
