const express = require("express");
const upload = require("../middlewares/upload");
const { newProduct, getProducts, getActiveProducts, updateProduct, getOneProduct, deleteProduct, updateProductStatus } = require("../Controllers/product");

let router = express.Router();

const multiUpload = upload.fields([
    {
        name: "cover_image",
        maxCount: 1,
    },
    {
        name: "images",
        maxCount: 10,
    }
]);

router.patch("/status/:productId", updateProductStatus);
router.get("/active", getActiveProducts);
router.get("/:productId", getOneProduct);
router.patch("/:productId", multiUpload, updateProduct);    // Need changes, images & tags not updating due to login
router.delete("/:productId", deleteProduct);
router.post("/", multiUpload, newProduct);
router.get("/", getProducts);

module.exports = router;