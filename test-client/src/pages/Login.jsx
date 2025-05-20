import { Link,useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axos from "../axos";
import {useAuth} from "../contexts/AuthContext";
export default function Login()
{
    const navigate=useNavigate();
    const {handleLogin,isLoggedIn}=useAuth();
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
        var data=new FormData(e.target);
        data=Object.fromEntries(data.entries());
        await axos.post("api/user/login",{...data});
        toast.success("Credentials Authenticated");
        handleLogin();
        }
        catch(err)
        {
            console.log(err);
            toast.error("Login Failed: "+(err?.response?.data?.message||err));
        }
    }
    return(
    <div className="login-container">
            <form onSubmit={handleSubmit} id="login" className="login-form">
                <div className="login-header">
                    <h2>Login Form</h2>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Username</label>
                    <input type="email" id="email" required name="email" className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" required name="password" className="form-control" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                <div className="new-here">
                    <span>New Here?</span>
                    <Link to="/register">Register</Link>
                </div>
            </form>
    </div>);
}