const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: "Item" },
  quantity: { type: Number, required: true },
});

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  cartItems: [cartItemSchema],
});

module.exports = mongoose.model("Cart", cartSchema);
