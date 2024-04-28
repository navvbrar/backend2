const express = require("express");
const router = express.Router();
const payments = require("../controllers/payment")

router.post("/",payments);

module.exports = router