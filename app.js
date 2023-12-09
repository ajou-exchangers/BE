const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

const errorHandler = require("./middlewares/errorHandler");

const app = express();
const port = 3000;

mongoose
	.connect(process.env.DB_URL)
	.then(() => console.log("Successfully connected to MongoDB"))
	.catch((error) => console.error("Connection error", error));
require("./models/User");
require("./models/Post");
require("./models/Comment");
require("./models/Location");
require("./models/Keyword");
require("./models/Review");

app.use(express.json());
app.use(morgan("dev"));
app.use(cors({ origin: true, credentials: true }));
app.use(
	session({
		name: "exchangers.sid",
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
		proxy: true,
		cookie: {
			httpOnly: true,
			secure: true,
			sameSite: "none",
			maxAge: 1000 * 60 * 60 * 24 * 3, // 3일
		},
	})
);

const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const adminRouter = require("./routes/admin");
const locationRouter = require("./routes/location");
const keywordRouter = require("./routes/keyword");
const reviewRouter = require("./routes/review");
const boardRouter = require("./routes/board");
const s3Router = require("./routes/s3");
const User = require("./models/User");

app.use("/api/exchangers/v1", indexRouter);
app.use("/api/exchangers/v1/auth", authRouter);
app.use("/api/exchangers/v1/user", userRouter);
app.use("/api/exchangers/v1/admin", adminRouter);
app.use("/api/exchangers/v1/locations", locationRouter);
app.use("/api/exchangers/v1/keywords", keywordRouter);
app.use("/api/exchangers/v1/reviews", reviewRouter);
app.use("/api/exchangers/v1/board", boardRouter);
app.use("/api/exchangers/v1/s3", s3Router);

app.use(errorHandler);

app.listen(port, () => {
	console.log(`App listening at http://localhost:${port}`);
});
