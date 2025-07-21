const Cart = require("../models/Cart");


const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId }).populate("cartItems.itemId");
    if (!cart) return res.json({ cartItems: [] });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: "Error fetching cart", error: err.message });
  }
};


const addToCart = async (req, res) => {
  const { userId, itemId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, cartItems: [] });
    }

    const existingItemIndex = cart.cartItems.findIndex(
      (item) => item.itemId.toString() === itemId
    );

    if (existingItemIndex > -1) {
      cart.cartItems[existingItemIndex].quantity += quantity;
    } else {
      cart.cartItems.push({ itemId, quantity });
    }

    await cart.save();
    res.status(200).json({ message: "Item added to cart", cart });
  } catch (err) {
    res.status(500).json({ message: "Error adding to cart", error: err.message });
  }
};


const removeFromCart = async (req, res) => {
  const { userId, itemId } = req.params;
  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.cartItems = cart.cartItems.filter(i => i.itemId.toString() !== itemId);
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: "Error removing item", error: err.message });
  }
};


const clearCart = async (req, res) => {
  const { userId } = req.params;
  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.cartItems = [];
    await cart.save();

    res.json({ message: "Cart cleared successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error clearing cart", error: err.message });
  }
};

module.exports = {
  addToCart,
  getCart,
  removeFromCart,
  clearCart 
};

module.exports = { addToCart, getCart, removeFromCart, clearCart };
