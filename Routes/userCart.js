const express = require("express");
let router = express.Router();
const { createCart, findUserCart, removeFromCart } = require("../Controllers/userCart");

router.post("/", createCart);
router.get("/:userId", findUserCart);
router.delete("/:userId/:productId", removeFromCart);

module.exports = router;