const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
  },
  email: {
    type: String,
    required: false,
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    ],
  },
  phone: {
    type: String,
    required: [true, "Please provide phone number"],
    unique: true,
  },
  address: {
    type: String,
    required: false,
  },
});

const Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer;
