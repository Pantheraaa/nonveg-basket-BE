const express = require("express");
const { insertItems, getCustomerBasket, removeItem, inc, increaseCustomerBasket, decreaseCustomerBasket } = require("../Controllers/basketItems");
const customerAuth = require("../middlewares/customerAuth");
let router = express.Router();

router.delete("/:basketItemId", customerAuth, removeItem);
router.patch("/increase/:basketItemId", customerAuth, increaseCustomerBasket);
router.patch("/decrease/:basketItemId", customerAuth, decreaseCustomerBasket);
router.get("/", customerAuth, getCustomerBasket);
router.post("/", customerAuth, insertItems);

module.exports = router;