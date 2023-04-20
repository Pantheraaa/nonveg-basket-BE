const express = require("express");
const upload = require("../middlewares/upload");
const { newProduct, getProducts, getActiveProducts, updateProduct, getOneProduct } = require("../Controllers/product");

let router = express.Router();

const multiUpload = upload.fields([
    {
        name: "coverImage",
        maxCount: 1,
    },
    {
        name: "images",
        maxCount: 10,
    }
]);

router.patch("/:productId", updateProduct);
router.get("/:productId", getOneProduct);
router.get("/active", getActiveProducts);
router.post("/", multiUpload, newProduct);
router.get("/", getProducts);

module.exports = router;
