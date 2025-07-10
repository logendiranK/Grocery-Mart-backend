const express = require('express');
const router = express.Router();
const {
  addToCart,
  getCart,
  removeFromCart,
  clearCart, 
} = require('../controllers/cartControllers');

router.post('/add', addToCart);
router.get('/:userId', getCart);
router.delete('/:userId/:itemId', removeFromCart);
router.delete('/clear/:userId', clearCart);

module.exports = router;
