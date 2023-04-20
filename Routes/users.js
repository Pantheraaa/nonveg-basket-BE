const express = require("express");
const { newUser, users, login } = require("../Controllers/user.js");

let router = express.Router();

router.post("/", newUser);
router.get("/", users);
router.post("/login", login);

module.exports = router;