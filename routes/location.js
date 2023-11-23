const express = require("express");
const {applyLocation, readLocations, readLocation} = require("../controller/location");
const {checkAuthenticated} = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/",readLocations)
//당분간 로그인이 필요없는 장소등록으로 배포
// router.post("/",checkAuthenticated,applyLocation);
router.post("/",applyLocation)
router.get("/:id",readLocation);


module.exports = router;