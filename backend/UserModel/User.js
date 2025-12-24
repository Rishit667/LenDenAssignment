const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { encryptAadharNo, decryptAadharNo } = require("../utils/adharUtils");

const userSchema = new mongoose.Schema({
  username : {type:String,required:true},
  email : {type : String, required: true, unique: true},
  password : {type:String,required:true},
  phoneNo:{type:Number,required:true},
  age:{type:Number,required:true},
  city:{type:String},
  state:{type:String},
  country:{type:String},
  AadharNo:{type:String,required:true},
},{timestamps:true});

 userSchema.pre('save', async function () {
  if (!this.isModified('password')) {
    return;
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.pre("save",  function () {
  if (!this.isModified("AadharNo")) {
    return;
  }
  if (this.AadharNo) {
    this.AadharNo =  encryptAadharNo(this.AadharNo);
  }
});

userSchema.methods.getDecryptedAadhar = function () {
  return decryptAadharNo(this.AadharNo);
};


userSchema.methods.matchPassword = function(enteredPassword){
  if (!this.password) return false; 
  return bcrypt.compare(enteredPassword ,this.password);
};

module.exports = mongoose.model("User", userSchema);