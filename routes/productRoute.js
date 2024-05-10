const express = require("express");
const router = express.Router();
const protect = require("../middlewares/authMiddleware");
const {
  createProduct,
  getProducts,
  getProduct,
} = require("../controllers/productController");
const { upload } = require("../utils/fileUpload");

//routes
router.post("/createproduct", protect, upload.single("image"), createProduct);
router.get("/getproducts", protect, getProducts);
router.get("/getproduct/:id", getProduct);
module.exports = router;
