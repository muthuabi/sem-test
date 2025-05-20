import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axos from "../axos";
import {useEffect} from "react";
export default function Register()
{
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
        var data=new FormData(e.target);
        data=Object.fromEntries(data.entries());
        if(data?.password!=data?.cpassword)
        {
            toast.error("Password Mismatch");
            return;
        }
      
            await axos.post("api/user/",{...data});
            toast.success("Registered Successfully");
        }
        catch(err)
        {
            toast.error("Registration Failure "+(err?.response?.data?.message || err?.message));
        }
    }
    useEffect(()=>{
        const pass=document.getElementById("password");
        const cpass=document.getElementById("cpassword");
        const validatePass=()=>{
            if(pass.value!=cpass.value)
                    cpass.setCustomValidity("Password Mismatch");
            else
                cpass.setCustomValidity("");
        }
        pass.addEventListener("input",validatePass);
        cpass.addEventListener("input",validatePass);
        return(()=>{
            pass.removeEventListener("input",validatePass);
            cpass.removeEventListener("input",validatePass);
        })
    },[]);
    return(
    <div className="login-container">
            <form onSubmit={handleSubmit} id="login" className="login-form">
                <div className="login-header">
                    <h2>Register Form</h2>
                </div>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" className="form-control" required/>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" className="form-control" required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" className="form-control" required/>
                </div>
                <div className="form-group">
                    <label htmlFor="cpassword">Confirm Password</label>
                    <input type="password" id="cpassword" name="cpassword" className="form-control" required />
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
                <div className="new-here">
                    <span>Have an Account?</span>
                    <Link to="/login">Login</Link>
                </div>
            </form>
    </div>);
}