const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const productRoutes = require("./routes/products");

const app = express();
const PORT = process.env.PORT || 3000;
const DB_URI = "mongodb+srv://sparshkr24:sparshkr24@codemon.uvag1qj.mongodb.net/?retryWrites=true&w=majority";

// connect to the database
mongoose
  .connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.log(`Failed to connect to the database: ${err}`);
  });

// use body-parser middleware to parse incoming requests
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

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
