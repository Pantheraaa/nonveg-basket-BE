const express = require("express");
const { newUser, users, login, authUser } = require("../Controllers/user.js");

let router = express.Router();

router.post("/login", login);
router.post("/auth", authUser);
router.post("/", newUser);
router.get("/", users);

module.exports = router;