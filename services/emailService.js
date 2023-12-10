const nodeMailer = require("nodemailer");
const { encrypt } = require("../utils/cryptoUtils");
const ERROR_MESSAGE = require("../constants/errorMessage");
const ERROR_CODES = require("../constants/errorCodes");

exports.sendMail = async (id, email) => {
	const transporter = nodeMailer.createTransport({
		service: "gmail",
		auth: {
			user: process.env.MAILER_EMAIL,
			pass: process.env.MAILER_PWD,
		},
	});

	const mailOptions = {
		from: "Exchangers <${process.env.MAILER_EMAIL}>",
		to: email,
		subject: "Exchangers Registration Confirmation Email",
		html: `
			<h1>Thank you for registering with Exchangers.</h1>
			<p>Click on the 'Verify Email' button to complete the email verification.</p>
			<a href="${process.env.API_ENDPOINT}/auth/verify-email?user=${encrypt(id)}"
			style="
				display: inline-block;
				background-color: #6d5c98;
				color: #fff;
				text-decoration: none;
				padding: 14px 20px;
				text-align: center;
				border: none;
				border-radius: 12px;
				font-size: 1rem;
				"
			>
			Verify Email</a>
        `,
	};

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			throw CustomError(
				ERROR_CODES.INTERNAL_SERVER,
				ERROR_MESSAGE.EMAIL_SEND_FAILED
			);
		}
	});
};
