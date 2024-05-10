const express = require("express");
const router = express.Router();
const protect = require("../middlewares/authMiddleware");
const {
  createCustomer,
  updateCustomer,
  showCustomer,
  deleteCustomer,
} = require("../controllers/customerController");

//routes
router.post("/create", protect, createCustomer);
router.post("/update/:id", protect, updateCustomer);
router.get("/showlist", protect, showCustomer);
router.delete("/deleteCustomer/:id", protect, deleteCustomer);

module.exports = router;
