import {useAuth} from "../contexts/AuthContext";
import axos from "../axos";
import { useState,useEffect } from "react";
export default function UsersList()
{
    const [users,setUsers]=useState([]);
    const fetchUsers=async()=>{
        try{
        const res=await axos.get("api/user/");
        setUsers(res?.data?.data);
        }
        catch(err)
        {
            console.log(err);
        }
        finally
        {
            console.log("Fetch Complete");
        }
    }
    useEffect(()=>{
        fetchUsers();
    },[]);
    if(!users || users.length==0)
        return (<div className="container"><div className="alert alert-info">No Data Available</div></div>);
    return(
        <div className="container">
                <div className="table-responive">
                    <table className="table">
                        <thead>
                            <tr>{
                                Object.keys(users[0]).filter(item=>(item!='__v' && item!='_id')).map((key,idx)=>{
                                    return (<th key={idx}>{key}</th>)
                                })
                                }</tr>
                        </thead>
                        <tbody>
                            {
                            users.map((user,id)=>{
                                return (
                                    <tr key={id}>
                                        {
                                            Object.keys(user).filter(item=>(item!='__v' && item!='_id')).map((key,idk)=>{
                                                return <td key={idk}>{user[key]}</td>;
                                            })
                                        }
                                    </tr>
                                )
                            })
                            }
                        </tbody>
                    </table>
                </div>
        </div>
    );
}