const crypto = require("crypto");

exports.encrypt = (text) => {
	const keyBuffer = Buffer.from(process.env.CRYPTO_SECRET, "hex");
	const ivBuffer = Buffer.from(process.env.CRYPTO_IV, "hex");
	const cipher = crypto.createCipheriv("aes-256-cbc", keyBuffer, ivBuffer);
	let result = cipher.update(text, "utf8", "base64");
	result += cipher.final("base64");
	return result;
};

exports.decrypt = (text) => {
	const keyBuffer = Buffer.from(process.env.CRYPTO_SECRET, "hex");
	const ivBuffer = Buffer.from(process.env.CRYPTO_IV, "hex");
	const decipher = crypto.createDecipheriv(
		"aes-256-cbc",
		keyBuffer,
		ivBuffer
	);
	let result = decipher.update(text, "base64", "utf8");
	result += decipher.final("utf8");
	return result;
};
