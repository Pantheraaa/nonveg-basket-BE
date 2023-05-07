const express = require("express");
const { newShop, getAllShop, getOneShop } = require("../Controllers/shop");
let router = express.Router();

router.post("/", newShop);
router.get("/", getAllShop);
router.get("/:id", getOneShop);

module.exports = router;