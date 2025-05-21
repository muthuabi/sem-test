import { createContext,useContext,useEffect,useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axos from "../axos";
const AuthContext=createContext();
export const AuthProvider=({children})=>
{
    const navigate=useNavigate();
    const [user,setUser]=useState(null);
    const [isLoggedIn,setIsLoggedIn]=useState(false);
    const handleCookie=()=>{
        const userCookie = Cookies.get("user");
        if (userCookie) {
            try {
                const userCook = JSON.parse(userCookie);
                setUser(userCook);
                setIsLoggedIn(true);
                return true;
            } catch (err) {
                console.error("Invalid cookie format:", err);
                Cookies.remove("user"); // optional: clean up corrupted cookie
            }
        }
        return false;
    }
    const handleLogin = async() => {
        if(handleCookie())
            navigate("/");
    };

    const logout=async()=>{
        try{
        await axos.post("api/user/logout");
        }
        catch(err)
        {
            console.log(err);
        }
        finally
        {
            setUser(null);
            setIsLoggedIn(false);
            navigate("/");
        }
    }
    useEffect(()=>{
        handleCookie();
    },[])
    useEffect(()=>{
        //later
    },[user,isLoggedIn]);
    return (<AuthContext.Provider value={{user,setUser,handleCookie,isLoggedIn,setIsLoggedIn,handleLogin,logout}}>
        {children}
    </AuthContext.Provider>);
}
export const useAuth=()=>useContext(AuthContext); 