const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const productRoutes = require("./routes/products");
const connectDB = require("./config/db");
const config = require("config");

const app = express();
const PORT = config.get('PORT') || 3000;

// connect to the database
connectDB()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// route for products
app.use("/products", productRoutes);

// handle 404 errors
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

// handle other errors
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      "status": error.status,
      "message": error.message,
    },
  });
});

const server = app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

module.exports = {app, server}