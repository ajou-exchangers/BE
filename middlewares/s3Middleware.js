const multer = require("multer");
const multerS3 = require("multer-s3");
const { S3Client } = require("@aws-sdk/client-s3");

const s3 = new S3Client({
    region: "ap-northeast-2",
    credentials: {
        accessKeyId: process.env.ACCESS_KEY,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
    },
});

const upload = multer({
    storage: multerS3({
        s3,
        bucket: "ajouexchangers",
        key(req, file, cd) {
            cd(null, `${Date.now()}_${file.originalname}`);
        },
    }),
});

/*
사용방법

이미지 1개 업로드
app.post("/upload", upload.single("img"), async (req, res) => {
  console.log(req.file);
  res.json({ imageUrl: req.file.location });
});

이미지 복수개 업로드
app.post("/upload", upload.array("images"), async (req, res) => {
  console.log(req.files);

  const imageUrls = req.files.map((file) => file.location);
  res.json({ imageUrls });
});

다양한 유형의 데이터
app.post("/uploadPost", upload.single("image"), async (req, res) => {
  const postText = req.body.text; // "text" 필드의 데이터
  console.log(postText);
  const imageUrl = req.file ? req.file.location : null; // "image" 필드의 파일 URL
  res.json({ postText, imageUrl });
});
 */

module.exports = upload;