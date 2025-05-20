const express=require("express");
const cors=require("cors");
const dotenv=require("dotenv");
const cookieParser=require("cookie-parser");
dotenv.config();
const mongoose=require("mongoose");
const app=express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:["http://localhost:5173"],
    methods:["PUT","GET","POST","DELETE"],
    credentials:true
}));
const PORT=5000;
const CONN=process.env.MONGO_CONN_STR;
async function connectDB()
{
    try{
        await mongoose.connect(CONN);
        console.log("MONGODB CONNECTED");
    }
    catch(err)
    {
        console.log(err);
        process.exit(1);
    }
}
connectDB();
app.get("/",(req,res)=>{
        res.send({sucess:true,data:null,message:"Hello World",err:null});
});
const userRoutes=require("../routes/userRoutes");
app.use("/api/user",userRoutes);
app.listen(PORT,()=>{
    console.log(`Server Listening on ${PORT}`);
});
