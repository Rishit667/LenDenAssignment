const jwt = require('jsonwebtoken')
const User = require('../UserModel/User')

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '10d' });
};

exports.register = async(req,res) => {
  try {
    const {username,email,password,phoneNo,age,city,state,country,AadharNo} = req.body;
    const userExists = await User.findOne({email});
    if(userExists){
      return res.status(400).json({message:"User already exists"});
    }
    const user = await User.create({username,email,password,phoneNo,age,city,state,country,AadharNo});
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
}

exports.login = async(req,res)=>{
  try {
    const {email,password} = req.body;
    const user = await User.findOne({email}).select("+password");
    if(!user || !(await user.matchPassword(password))){
      return res.status(401).json({message: "Invalid email or password"});
    }
    res.status(200).json({
      _id:user._id,
      username:user.username,
      email:user.email,
      token:generateToken(user._id),
    })

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
}