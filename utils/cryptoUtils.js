const crypto = require("crypto");

const keyBuffer = Buffer.from(process.env.CRYPTO_SECRET, "hex");
const ivBuffer = Buffer.from(process.env.CRYPTO_IV, "hex");

exports.encrypt = (text) => {
	const encipher = crypto.createCipheriv("aes-256-cbc", keyBuffer, ivBuffer);
	const result = Buffer.concat([encipher.update(text), encipher.final()]);
	return encodeURIComponent(result.toString("base64"));
};

exports.decrypt = (text) => {
	if (!text) return null;
	const decipher = crypto.createDecipheriv(
		"aes-256-cbc",
		keyBuffer,
		ivBuffer
	);
	const result = Buffer.concat([
		decipher.update(decodeURIComponent(text), "base64"),
		decipher.final(),
	]);
	return result.toString();
};
