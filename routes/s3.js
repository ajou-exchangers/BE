const express = require("express");
const upload = require('../middlewares/s3Middleware');
const s3Controller = require("../controllers/s3Controller");
const router = express.Router();

//test를 위한 api
router.post("/upload", upload.single("image"), s3Controller.s3Upload);

module.exports = router;