const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log("MongoDB connection error:", error));

// Define schemas
const categorySchema = new mongoose.Schema({
  title: String,
  description: String,
  id: Number,
});

const productSchema = new mongoose.Schema({
  title: String,
  quantity: String,
  selectCategory: {
    title: String,
    description: String,
    id: Number,
    // ref: 'Category'
  },
  id: Number,
  AtCreate: Date
});


// Define models
const Category = mongoose.model("Category", categorySchema);
const Product = mongoose.model("Product", productSchema);

// Define routes
app.get("/categories", async (req, res) => {
  const categories = await Category.find();
  res.send(categories);
});

app.post("/categories", async (req, res) => {
  const category = new Category({
    title: req.body.title,
    description: req.body.description,
    id: Date.now(),
  });
  await category.save();
  res.send(category);
});

app.get("/products", async (req, res) => {
  const products = await Product.find().populate("selectCategory");
  res.send(products);
});

app.post("/products", async (req, res) => {
  const category = await Category.findOne({ id: req.body.categoryId });
  const product = new Product({
    title: req.body.title,
    quantity: req.body.quantity,
    selectCategory: category._id,
    id: Date.now(),
    AtCreate: new Date(),
  });
  await product.save();
  res.send(product);
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
