const express = require("express");
const mongoose = require("mongoose");
const Product = require("../models/product");

const router = express.Router();

// GET all products
router.get("/", async (req, res, next) => {
  try {
    const products = await Product.find().select("-__v");
    return res.status(200).json(products);
  } catch (error) {
    next(error);
  }
});

// GET a product by ID
router.get("/:productId", async (req, res, next) => {
  const productId = req.params.productId;
  try {
    const product = await Product.findById(productId).select("-__v");
    if (product) {
      return res.status(200).json(product);
    } else {
      const error = new Error(`Product with ID ${productId} not found`);
      error.status = 404;
      throw error;
    }
  } catch (error) {
    next(error);
  }
});

// PATCH(update) the price of a product by ID
router.patch("/:productId", async (req, res, next) => {
  const productId = req.params.productId;
  const updateOps = {};
  if(req.body.price && typeof(req.body.price)=='number'){
    updateOps["price"] = req.body.price;
  } else{
    
    return res.status(403).json({
      error:{
        "status": 403,
        "message": "Invalid payload"
      }
    })
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { $set: updateOps },
      { new: true }
    );
    if (updatedProduct) {
      return res.status(200).json(updatedProduct);
    } else {
      const error = new Error(`Product with ID ${productId} not found`);
      error.status = 404;
      throw error;
    }
  } catch (error) {
    next(error);
  }
});

//POST API
//To add new products (for testing purposes)
router.post("/", async (req, res, next) => {
  try {
    const product = req.body;
    const newProduct = new Product(product);

    await newProduct.save();

    return res.status(200).json(newProduct);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
