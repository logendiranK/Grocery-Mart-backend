const mongoose=require("mongoose");
const orderSchema=new mongoose.Schema({
  userId:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
  items:[{
    itemId:{type:mongoose.Schema.Types.ObjectId,ref:"Item"},
    quantity:Number
  }],
  totalPrice:Number,
  status:{type:String,default:"Pending"},
  createdAt:{type:Date,default:Date.now}
});
module.exports=mongoose.model("Order",orderSchema);
