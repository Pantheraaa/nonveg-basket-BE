const express = require("express");
const customerAuth = require("../middlewares/customerAuth");
const { getDeliverySlots, newDeliverySlot, newDeliveryTiming } = require("../Controllers/deliverSlots");
let router = express.Router();

router.post("/:slotId", newDeliveryTiming);
router.post("/", customerAuth, newDeliverySlot);
router.get("/", customerAuth, getDeliverySlots);

module.exports = router;