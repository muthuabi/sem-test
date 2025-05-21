const express=require("express");
const dotenv=require("dotenv");
const mongoose = require("mongoose");
const cookieParser=require("cookie-parser");
const cors=require("cors");
const PORT=5000;
dotenv.config();
const app=express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:5173","http://localhost:5174"],
    method:["PUT","DELETE","GET","POST"],
    credentials:true
}));
const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_CONN_STR);
        console.log("MongoDB Connected");
    }
    catch(err)
    {
        console.log(err);
        process.exit(1);
    }
}
connectDB();
app.get("/",(req,res)=>{
    res.status(200).json({success:true,message:"Hello World",data:null,err:null});
});
const userRoutes=require("./routes/userRoutes");
const travelRoutes=require("./routes/travelRoutes");
app.use("/api/user",userRoutes);
app.use("/api/travel",travelRoutes);
app.listen(PORT,()=>{
    console.log(`Server listening on ${PORT}`);
})