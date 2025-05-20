import { Link } from "react-router-dom";
import railImg from "../assets/images/rail1.jpg";
export default function PageNotFound()
{
    return(
            <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",height:"100vh"}}>
                <h1 style={{fontSize:200}}>404</h1>
                <h2>PAGE NOT FOUND</h2>
                <Link className="btn btn-lg btn-dark" to="/">Go to Home</Link>               
            </div>
    )
}