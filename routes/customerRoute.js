const express = require("express");
const router = express.Router();
const protect = require("../middlewares/authMiddleware");
const { insertCustomer } = require("../controllers/customerController");

//routes
router.get("/insert", insertCustomer);

module.exports = router;
