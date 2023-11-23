const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const morgan = require("morgan");
require("dotenv").config();

const errorHandler = require("./middlewares/errorHandler");

const app = express();
const port = 3000;

mongoose
	.connect(process.env.DB_URL)
	.then(() => console.log("Successfully connected to MongoDB"))
	.catch((error) => console.error("Connection error", error));

app.use(express.json());
app.use(morgan("dev"));
app.use(
	session({
		name: "exchangers.sid",
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
		cookie: {
			secure: false, // http도 허용
			maxAge: 1000 * 60 * 60 * 24 * 3, // 3일
		},
	})
);

const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const locationRouter = require("./routes/location");

app.use("/api/exchangers/v1", indexRouter);
app.use("/api/exchangers/v1/auth", authRouter);
app.use("/api/exchangers/v1//locations",locationRouter);

app.use(errorHandler);

app.listen(port, () => {
	console.log(`App listening at http://localhost:${port}`);
});
