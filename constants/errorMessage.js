const ERROR_MESSAGE = {
	USER_NOT_AUTHORIZED: "User not authorized",
	USER_ALREADY_AUTHORIZED: "User already authorized",
	USER_NOT_FOUND: "User not found",
	USER_ALREADY_EXISTS: "User already exists",
	INVALID_ARGUMENT: "Invalid argument",
	NICKNAME_ALREADY_EXISTS: "Nickname already exists",
	SESSION_DESTROY_FAILED: "Failed to destroy session",
	EMAIL_NOT_VERIFIED: "Email not verified",
	EMAIL_SEND_FAILED: "Failed to send email",

	LOCATION_NOT_FOUND: "Location not found",
	REVIEW_NOT_FOUND: "Review not found",
	FORBIDDEN_MESSAGE: "You do not have permission.",
	USER_REVIEW_NOT_FOUND:
		"This review was not user-written or the review does not exist.",
	ADMIN_LOGIN_FAIL: "This is not an admin account.",

	POST_NOT_FOUND: "Post not found",
	COMMENT_NOT_FOUND: "Comment not found",
	NOT_THE_AUTHOR: "Not the author",
	COMMENT_NOT_IN_THE_POST: "Comment not in the post",

	LOCATION_UPDATE_NOT_FOUND: "Location Update not found",
	LOCATION_ADD_CONFLICT:"This place already exists.",
};

module.exports = ERROR_MESSAGE;
