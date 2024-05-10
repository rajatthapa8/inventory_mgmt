const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const { fileSizeFormatter } = require("../utils/fileUpload");
const cloudinary = require("cloudinary").v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.Cloud_name,
  api_key: process.env.API_key,
  api_secret: process.env.API_secret,
});

//creating product
const createProduct = asyncHandler(async (req, res) => {
  const { name, category, quantity, price, description } = req.body;
  if (!name || !category || !quantity || !price) {
    res.status(400);
    throw new Error("Please fill in all the details");
  }

  //checking if the product exist in the db
  const checkProduct = await Product.findOne({ name });
  if (checkProduct) {
    res.status(400);
    throw new Error("This product already exist");
  }

  // Handle Image upload
  let fileData = {};
  if (req.file) {
    // Save image to cloudinary
    let uploadedFile;
    try {
      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: "Inventory management app",
        resource_type: "image",
      });
    } catch (error) {
      res.status(500);
      throw new Error("Image could not be uploaded");
    }

    fileData = {
      fileName: req.file.originalname,
      filePath: uploadedFile.secure_url,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2),
    };
  }

  //inserting
  const product = await Product.create({
    name: name,
    category: category,
    quantity: quantity,
    price: price,
    description: description,
    image: fileData,
  });
  res.status(201).json(product);
});

//getting all the products
const getProducts = asyncHandler(async (req, res) => {
  const product = await Product.find();

  res.status(201).json(product);
  if (!product) {
    res.json(400);
    throw new Error("No product found");
  }
});

//getting single product
const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.status(201).json(product);
  if (!product) {
    res.status(404);
    throw new Error("No product found");
  }
});
module.exports = {
  createProduct,
  getProducts,
  getProduct,
};
