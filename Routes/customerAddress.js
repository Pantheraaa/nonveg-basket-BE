const express = require("express");
const customerAuth = require("../middlewares/customerAuth");
const { addCustomerAddress, findCustomerAddresses, updateCustomerAddress, deleteCustomerAddress } = require("../Controllers/customerAddress");
let router = express.Router();

// router.post("/auth", customerAuth, customerAuthentication);
// router.post("/login", customerLogin);
router.delete("/:addressId", customerAuth, deleteCustomerAddress);
router.patch("/:addressId", customerAuth, updateCustomerAddress);
router.get("/", customerAuth, findCustomerAddresses);
router.post("/", customerAuth, addCustomerAddress);

module.exports = router;