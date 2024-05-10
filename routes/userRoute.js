const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  loggedIn,
  updateUser,
} = require("../controllers/userController");
const protect = require("../middlewares/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/getuser", protect, getUser);
router.get("/loggedin", loggedIn); //this route checks if the user is logged in or not kinda like session
router.patch("/updateDetails", protect, updateUser);
module.exports = router;
