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
		subject: "Exchangers 가입 인증 메일입니다.",
		html: `
            <h1>Exchangers에 가입해주셔서 감사합니다.</h1>
            <p>이메일 인증하기 버튼을 누르시면 이메일 인증이 완료됩니다.</p>
            <a href="${
				process.env.API_ENDPOINT
			}/auth/verify-email?user=${encrypt(id)}"
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
			이메일 인증하기</a>
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
