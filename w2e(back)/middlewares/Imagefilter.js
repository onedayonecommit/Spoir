const multer = require("multer");

/** 확장자가 jpg,jpeg,png만 걸러주는 함수 */
const imageFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        return cb(new Error("Only image files are allowed!"));
    }
    cb(null, true);
};

/** 프론트로부터 받아온 프로필이미지 서버 스토리지에 저장하는 함수 */
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-bezkoder-${file.originalname}`);
    }
});

/** 업로드 함수 */
var uploadFile = multer({ storage: storage, fileFilter: imageFilter }).single(
    "photo"
)

module.exports = uploadFile;