const mongoose = require('mongoose');
const dotenv=require('dotenv').config();
const connection=mongoose.connect(process.env.MongoURI).then(()=>{
    console.log("connected to database")
}).catch((err)=>{
    console.log({"error":err})
})


module.exports=connection