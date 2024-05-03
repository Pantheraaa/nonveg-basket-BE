const express = require("express");
const customerAuth = require("../middlewares/customerAuth");
const { createNewOrder, verifyPayment, removeBasketItem } = require("../Controllers/payment");
let router = express.Router();

router.post("/verify", customerAuth, verifyPayment)
router.post("/orders", customerAuth, createNewOrder);
router.post("/baskrem", removeBasketItem);

module.exports = router;