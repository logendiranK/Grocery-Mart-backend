const User=require("../models/User");
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

const registerUser=async(req,res)=>{
  const {name,email,password,address,mobilenumber}=req.body;
  try{
    const userExist=await User.findOne({email});
    if(userExist) return res.status(400).json({message:'User Already Exists'});

    const hashedPassword=await bcrypt.hash(password,10);

    const user = new User({
      name,
      email,
      password:hashedPassword,
      address,
      mobilenumber,
    });
    await user.save();
    res.status(201).json({message:'user registered successfully'});
  }
  catch(err)
  {
    res.status(500).json({message:'Server error',error:err.message});
  }
};

const loginUser=async(req,res)=>{
  const{email,password}=req.body;
  try{
    const user=await User.findOne({email});
    if(!user) return res.status(400).json({message:'invalid credentials'});

    const ismatch=await bcrypt.compare(password,user.password);
    if(!ismatch) return res.status(400).json({message:'invalid credentials'});

    const token = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '1h' });

    res.json({ token, user });

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
module.exports={registerUser,loginUser};
