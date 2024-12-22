const express = require('express');
const router = express.Router();
const userCtrl = require("../controllers/userctrl");

router.post("/register", userCtrl.registerUser);

router.post("/login",userCtrl.loginUser);


module.exports = router;