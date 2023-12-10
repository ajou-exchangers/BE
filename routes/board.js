const express = require("express");
const router = express.Router();

const boardController = require("../controllers/boardController");
const { checkAuthenticated } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/s3Middleware");

// 게시글 API
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
	upload.single("image"),
	boardController.updatePost
);
router.delete("/:postId", checkAuthenticated, boardController.deletePost);
router.put("/:postId/like", checkAuthenticated, boardController.likePost);

// 댓글 API
router.post(
	"/:postId/comment",
	checkAuthenticated,
	upload.none(),
	boardController.createComment
);
router.put(
	"/:postId/comment/:commentId",
	checkAuthenticated,
	upload.none(),
	boardController.updateComment
);
router.delete(
	"/:postId/comment/:commentId",
	checkAuthenticated,
	boardController.deleteComment
);
router.put(
	"/:postId/comment/:commentId/like",
	checkAuthenticated,
	boardController.likeComment
);

module.exports = router;
