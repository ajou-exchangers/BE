const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const { checkAuthenticated } = require("../middlewares/authMiddleware");

router.get("/me", checkAuthenticated, userController.getUserInfo);
router.get("/posts", checkAuthenticated, userController.getUserPosts);
router.get("/comments", checkAuthenticated, userController.getUserComments);

module.exports = router;
