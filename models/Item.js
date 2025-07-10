const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: String,
  description: String,
  category: String,
  price: Number,
  image: String,
  weightOptions: [String]  
});

module.exports = mongoose.model("Item", itemSchema);
