const express = require("express");
const { newCategory, getCategories, getCategoryById, updateCategory, deleteCategory, getCategoriesProducts } = require("../Controllers/category");

let router = express.Router();

router.get("/:categoryId/products", getCategoriesProducts);
router.get("/:categoryId", getCategoryById);
router.patch("/:categoryId", updateCategory);
router.delete("/:categoryId", deleteCategory);
router.post("/", newCategory);
router.get("/", getCategories);

module.exports = router;