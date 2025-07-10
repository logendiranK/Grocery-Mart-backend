const User = require("../models/User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const registerUser = async (req, res) => {
  console.log("Incoming registration data:", req.body); 

  const { name, email, password, address, mobilenumber } = req.body;

  try {
    
    if (!name || !email || !password || !address || !mobilenumber) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }

   
    const hashedPassword = await bcrypt.hash(password, 10);

    
    const user = new User({
      name,
      email,
      password: hashedPassword,
      address,
      mobilenumber,
    });

    await user.save();

    res.status(201).json({ message: "User registered successfully" });

  } catch (err) {
    console.error("Registration error:", err.message); 
    res.status(500).json({ message: "Registration failed", error: err.message });
  }
};


const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

   
    const token = jwt.sign(
      { userId: user._id },
      'your_secret_key', 
      { expiresIn: '1h' }
    );

    res.json({ token, user });

  } catch (err) {
    console.error("Login error:", err.message); 
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};

module.exports = { registerUser, loginUser };
