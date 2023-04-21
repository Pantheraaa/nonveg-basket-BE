const express = require("express");
const upload = require("../middlewares/upload");
const { newProduct, getProducts, getActiveProducts, updateProduct, getOneProduct, deleteProduct } = require("../Controllers/product");

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

router.get("/active", getActiveProducts);   //
router.get("/:productId", getOneProduct);   // Done
router.patch("/:productId", multiUpload, updateProduct);    // Need changes, images & tags not updating due to login
router.delete("/:productId", deleteProduct);
router.post("/", multiUpload, newProduct);  // DOne
router.get("/", getProducts);   // DOne

module.exports = router;