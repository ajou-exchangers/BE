const crypto = require("crypto");

const keyBuffer = Buffer.from(process.env.CRYPTO_SECRET, "hex");
const ivBuffer = Buffer.from(process.env.CRYPTO_IV, "hex");

exports.encrypt = (text) => {
	const encipher = crypto.createCipheriv("aes-256-cbc", keyBuffer, ivBuffer);
	const result = Buffer.concat([
		encipher.update(text, "utf8"),
		encipher.final(),
	]);
	return result.toString("base64");
};

exports.decrypt = (text) => {
	const encryptedText = Buffer.from(text, "base64");
	const decipher = crypto.createDecipheriv(
		"aes-256-cbc",
		keyBuffer,
		ivBuffer
	);
	const result = Buffer.concat([
		decipher.update(encryptedText),
		decipher.final(),
	]);
	return result.toString("utf8");
};
