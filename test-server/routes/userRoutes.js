const express=require("express");
const router=express.Router();
const User=require("../models/User");
router.post("/",async(req,res)=>{
    try{
    const {name,email,password,cpassword}=req.body;
    let checkEmail=await User.findOne({email});
    if(checkEmail)
        return res.status(400).json({success:false,message:"Email Already Exists",err:"Email Exists"});
    let role="user";
    if(email.trim()=="admin@gmail.com")
        role="admin"

    if(password!=cpassword)
    {
        res.status(400).json({success:false,message:"Password Mismatch",err:"password mismatch"});
        return;
    }
    const user=new User({name,email,password,role});
    await user.save();
    res.status(200).json({success:true,data:user,message:"User Registered",err:null});
    }
    catch(err)
    {
        res.status(400).json({success:false,message:"Error",err})
    }

});
router.get("/",async(req,res)=>{
    try{
        const users=await User.find();
        res.status(200).json({success:true,data:users,message:"Data Fetched",err:null});
    }
    catch(err)
    {
        res.status(400).json({success:false,message:"Error",err});
    }
});
router.post("/login",async(req,res)=>{
    try{
        const {email,password}=req.body;
        
        const user=await User.findOne({email});
        if(!user)
            return res.status(404).json({success:false,message:"User Not Found",err:"Error"});
        if(user.password!=password)
            return res.status(403).json({success:false,message:"Invalid Password",err:"Error"});
        res.cookie("user",JSON.stringify(user));
        return res.status(200).json({success:true,message:"Credentials Authenticated",data:user});
    }
    catch(err)
    {
        return res.status(500).json({success:false,message:"Some Internal Error",err:err});
    }
});
router.post("/logout",async(req,res)=>{
    try{
    res.clearCookie("user");
    return res.status(200).json({success:true,message:"Logout Success"});
    }
    catch(err)
    {
        res.status(500).json({success:false,message:"Error",err:err});
    }
});
router.get("/:email",async(req,res)=>{

});
router.put("/:email",async(req,res)=>{

});
router.delete("/:email",async(req,res)=>{

});
module.exports=router;