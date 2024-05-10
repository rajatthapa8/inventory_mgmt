const asyncHandler = require("express-async-handler");
const Customer = require("../models/customerModel");
const mongoose = require("mongoose");

//creating the customer for the first time
const createCustomer = asyncHandler(async (req, res) => {
  const { name, email, phone, address } = await req.body;

  if (!name || !phone) {
    res.status(400);
    throw new Error("Please fill out the details");
  }
  //checking if the customer exist
  const customerExist_email = await Customer.findOne({ email });
  const customerExist_phone = await Customer.findOne({ phone });

  if (customerExist_email) {
    res.status(400);
    throw new Error("Customer with this email already exists");
  }

  if (customerExist_phone) {
    res.status(400);
    throw new Error("Customer with this phone number already exists");
  }
  const customer = await Customer.create({
    name: name,
    email: email,
    phone: phone,
    address: address,
  });

  if (customer) {
    const { _id, name, email, phone, address } = customer;
    res.status(200).json({
      _id,
      name,
      email,
      phone,
      address,
    });
  } else {
    res.status(400);
    throw new Error("Invalid customer data entered");
  }
});

//editing existing customer
const updateCustomer = asyncHandler(async (req, res) => {
  const customerId = req.params.id; //should be sent by front-end
  const editCustomer = await Customer.findByIdAndUpdate(customerId, {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
  });
  // const editCustomer = await Customer.findByIdAndUpdate(customerId);

  res.status(200).json(editCustomer);

  if (!editCustomer) {
    res.status(400);
    throw new Error("No Customer found with that id!");
  }
});

//show list of all the customer
const showCustomer = asyncHandler(async (req, res) => {
  const allCustomer = await Customer.find();

  if (allCustomer.length > 0) {
    const customerData = allCustomer.map((customer) => ({
      _id: customer._id,
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      address: customer.address,
    }));
    res.status(200).json(customerData);
  } else {
    res.status(400);
    throw new Error("No Customer found!");
  }
});

//delete customer
const deleteCustomer = asyncHandler(async (req, res) => {
  const customerId = req.params.id;
  const customer = await Customer.findByIdAndDelete(customerId);

  if (!customer) {
    res.status(400);
    throw new Error("No customer found with that details");
  } else {
    res.status(201);
    res.send("customer deleted successfully");
  }
});
module.exports = {
  createCustomer,
  updateCustomer,
  showCustomer,
  deleteCustomer,
};
