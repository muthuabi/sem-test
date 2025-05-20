const mongoose=require("mongoose");
const userSchema=mongoose.Schema({
    email:{
        type:String,
        required:[true,"Email is Required"],
        unique:[true,"Email Already Exists"],
        trim:true
    },
    name:{
        type:String,
        default:"Unknown",
        trim:true
    },
    password:{
        type:String,
        required:[true,"Password is Required"]
    },
    role:{
        type:String,
        enum:[
            "admin","user"
        ],
        default:"user"
    }
},{timestamps:true})
const User=mongoose.model("User",userSchema);
module.exports=User;