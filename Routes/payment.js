const express = require("express");
const customerAuth = require("../middlewares/customerAuth");
const { createNewOrder, verifyPayment } = require("../Controllers/payment");
let router = express.Router();

router.post("/verify", verifyPayment)
router.post("/orders", customerAuth, createNewOrder);

module.exports = router;