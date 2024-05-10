const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;
const userRoute = require("./routes/userRoute");
const customerRoute = require("./routes/customerRoute");
const productRoute = require("./routes/productRoute");
const errorHandler = require("./middlewares/errorMiddleware");
const cookieParser = require("cookie-parser");
const path = require("path");
//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
//routes middleware
app.use("/api/users", userRoute);
app.use("/api/customer", customerRoute);
app.use("/api/product", productRoute);
//routes
app.get("/", (req, res) => {
  res.send("This is homepage");
});

//error middleware
app.use(errorHandler);

//connection to Mongo DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server started at ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
