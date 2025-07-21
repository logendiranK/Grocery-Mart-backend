const Item = require('../models/Item');

const getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching items', error: err.message });
  }
};

const addItem = async (req, res) => {
  const { name, image, price, category, description } = req.body;
  try {
    const newItem = new Item({ name, image, price, category, description });
    await newItem.save();
    res.status(201).json({ message: 'Item added successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error adding item', error: err.message });
  }
};

module.exports = { getItems, addItem };
