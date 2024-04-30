const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;
const userRoute = require("./routes/userRoute");

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

//routes middleware
app.use("/api/users", userRoute);

//routes
app.get("/", (req, res) => {
  res.send("This is homepage");
});

//connection to Mongo DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server started at ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
