const express = require("express");
const { getCustomers, newCustomer, customerLogin, customerAuthentication, updateCustomer } = require("../Controllers/customer");
const customerAuth = require("../middlewares/customerAuth");
let router = express.Router();

router.post("/auth", customerAuth, customerAuthentication);
router.post("/login", customerLogin);
router.patch("/", customerAuth, updateCustomer);
router.post("/", newCustomer);
router.get("/", getCustomers);

module.exports = router;