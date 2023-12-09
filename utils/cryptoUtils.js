const crypto = require("crypto");

exports.encrypt = (text) => {
	const cipher = crypto.createCipher(
		"aes-256-cbc",
		process.env.CRYPTO_SECRET
	);
	let result = cipher.update(text, "utf8", "base64");
	result += cipher.final("base64");
	return result;
};

exports.decrypt = (text) => {
	const decipher = crypto.createDecipher(
		"aes-256-cbc",
		process.env.CRYPTO_SECRET
	);
	let result = decipher.update(text, "base64", "utf8");
	result += decipher.final("utf8");
	return result;
};
