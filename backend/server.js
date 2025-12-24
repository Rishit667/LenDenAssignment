require("dotenv").config();
const express = require('express');
const connectDb = require('./config/db');
const authRoutes = require('./Routes/authRoutes')
const userRoutes = require('./Routes/userRoutes')
const cors = require('cors')

const app = express();
app.use(express.json());
app.use(cors({
  origin:"*",
  credentials:true,
  methods:["GET","POST","PUT","DELETE","PATCH"],
  allowedHeaders:["Content-Type","Authorization"]
}))
connectDb();
app.use('/api/auth',authRoutes);
app.use('/api/user',userRoutes);
app.listen(5353,()=>{
  console.log('server started on port 5353');
})