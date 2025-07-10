const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const authRoutes=require('./routes/authRoutes');
const itemRoutes=require('./routes/itemRoutes');
const cartRoutes=require('./routes/cartRoutes');

dotenv.config();
const app=express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(()=>console.log("MongoDB Connected"))
  .catch((err)=>console.error("MongoDB Connection error",err));

app.use('/api/auth',authRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/cart',cartRoutes);


app.get("/",(req,res)=>{
  res.send("API is running");
});
const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>console.log(`Server running on port ${PORT}`))
