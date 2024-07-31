const mongoose = require("mongoose");
require("dotenv").config();
mongoose.connect("mongodb+srv://brenoramon55:vUMFxIE2DxhLroWX@cluster0.iysnyph.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(()=>{
    console.log("db is up!")
}).catch((err)=> console.log(err))

module.exports = mongoose;