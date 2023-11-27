const express = require("express");
const locationController = require("../controllers/locationController");
const {checkAuthenticated} = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/",locationController.readLocations)
//당분간 로그인이 필요없는 장소등록으로 배포
// router.post("/",checkAuthenticated,applyLocation);
router.post("/",locationController.applyLocation)
router.get("/:id",locationController.readLocation);


module.exports = router;