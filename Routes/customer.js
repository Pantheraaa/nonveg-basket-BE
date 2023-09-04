const express = require("express");
const { getCustomers, newCustomer, customerLogin, customerAuthentication, updateCustomer, customerOrders } = require("../Controllers/customer");
const customerAuth = require("../middlewares/customerAuth");
let router = express.Router();

router.post("/auth", customerAuth, customerAuthentication);
router.post("/login", customerLogin);
router.post("/", newCustomer);

router.patch("/", customerAuth, updateCustomer);

router.get("/orders", customerAuth, customerOrders);
router.get("/", getCustomers);

module.exports = router;