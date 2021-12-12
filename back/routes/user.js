const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/user");
const checkCaraPassword = require("../middleware/password-validator");

router.post("/signup", checkCaraPassword, userCtrl.signup);
router.post("/login", userCtrl.login);

module.exports = router;
