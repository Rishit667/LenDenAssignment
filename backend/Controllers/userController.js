const User = require('../UserModel/User');

exports.getProfile = async(req,res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId); 
    if(!user){
      return res.status(404).json({message:"user not found"});
    }
    const AadharNo= await user.getDecryptedAadhar();
    res.status(200).json({
      username:user.username,
      email:user.email,
      phoneNo:user.phoneNo,
      age:user.age,
      city:user.city,
      state:user.state,
      country:user.country,
      AadharNo,
    })
  } catch (error) {
    console.log(error.message);
    res.status(500).json({message:error.message});
  }
}