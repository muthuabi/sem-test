const mongoose=require("mongoose");
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        default:"Unknown",
        trim:true
    },
    email:{
        type:String,
        required:[true,"Email is Required"],
        trim:true,
        unique:[true,"Email Already Exists"]
    },
    password:
    {
        type:String,
        required:true
    },
    role:
    {
        type:String,
        default:"user",
        enum:["user","admin"]
    }
},{timestamps:true});
const User=mongoose.model("User",userSchema);
module.exports=User;