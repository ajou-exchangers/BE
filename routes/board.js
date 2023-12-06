const express = require("express");
const router = express.Router();

const boardController = require("../controllers/boardController");
const { checkAuthenticated } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/s3Middleware");

router.get("/", boardController.getBoard);
router.get("/:postId", boardController.getPost);
router.post(
	"/",
	checkAuthenticated,
	upload.single("image"),
	boardController.createPost
);
router.put(
	"/:postId",
	checkAuthenticated,
	upload.none(),
	boardController.updatePost
);
router.delete("/:postId", checkAuthenticated, boardController.deletePost);
router.put("/:postId/like", checkAuthenticated, boardController.likePost);

module.exports = router;
