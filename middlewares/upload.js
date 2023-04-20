const multer = require("multer");

const Storage = multer.diskStorage({
    destination: "uploads/products",
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: Storage });

module.exports = upload;