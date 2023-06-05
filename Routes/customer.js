const express = require("express");
const { getCustomers, newCustomer, customerLogin } = require("../Controllers/customer");
let router = express.Router();

router.post("/login", customerLogin);
router.post("/", newCustomer);
router.get("/", getCustomers);

module.exports = router;