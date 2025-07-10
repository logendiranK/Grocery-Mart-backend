const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Item = require('./models/Item');
const items = require('./data/items');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB connected...");
    await Item.deleteMany();
    await Item.insertMany(items);
    console.log("Items inserted successfully!");
    process.exit();
  })
  .catch((err) => {
    console.error("Seeding failed:", err.message);
    process.exit(1);
  });
