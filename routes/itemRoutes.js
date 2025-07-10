const express = require('express');
const router = express.Router();
const { getItems, addItem } = require('../controllers/itemControllers');

router.get('/', getItems);
router.post('/add', addItem);
module.exports = router;
