const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide your name"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Please provide your email address"],
      unique: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      ],
    },
    phone: {
      type: String,
      required: [true, "Please provide your phone number"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide your password"],
      minLength: [6, "Password must be at least six character long"],
      maxLength: [23, "Password must be no longer than 23 character"],
    },
    Photo: {
      type: String,
      required: [true, "Please add a photo"],
      default:
        "https://yt3.googleusercontent.com/ytc/AIdro_nU7cpSl72OE5-0JNYgziQYioLomL3XZidi6dN6cuz5qNs=s900-c-k-c0x00ffffff-no-rj",
    },
  },
  {
    timestamps: true,
  }
);

const Users = mongoose.model("User", userSchema);
module.exports = Users;
