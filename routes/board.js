const express = require("express");
const router = express.Router();

const boardController = require("../controllers/boardController");
const { checkAuthenticated } = require("../middlewares/authMiddleware");

router.get("/", boardController.getBoard);
router.get("/:postId", boardController.getPost);
router.post("/", checkAuthenticated, boardController.createPost);
router.put("/:postId", checkAuthenticated, boardController.updatePost);
router.delete("/:postId", checkAuthenticated, boardController.deletePost);

module.exports = router;