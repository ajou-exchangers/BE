const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
	content: { type: String, required: true },
	author: { type: Schema.Types.ObjectId, ref: "User", required: true },
	post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
	createdAt: { type: Date, default: Date.now },
	likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("Comment", commentSchema);
