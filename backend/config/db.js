const mongoose = require("mongoose");

const connectDb = async() => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {});
    console.log("Successfully connected to db");
  } catch (error) {
    console.error("error connecting to db : ",error);
    process.exit(1);
  }
}

module.exports = connectDb