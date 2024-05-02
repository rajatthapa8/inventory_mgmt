const expressAsyncHandler = require("express-async-handler");

const insertCustomer = expressAsyncHandler((req, res) => {
  res.send("insert customer route");
});

module.exports = {
  insertCustomer,
};
