import {Link} from 'react-router-dom';
import {useAuth} from "../contexts/AuthContext";
export default function Navbar()
{
    const {user,isLoggedIn,logout}=useAuth();
    return (
        <nav className='navbar navbar-expand-lg bg-dark navbar-dark'>
            <div className="container-fluid">
                <Link className='navbar-brand' to="/">Railway</Link>
                <button className='btn navbar-toggler' data-bs-toggle="offcanvas" data-bs-target="#sidemenu" >
                    <span className='navbar-toggler-icon'></span>
                </button>
            </div>
            <div className="offcanvas offcanvas-end bg-dark" id="sidemenu">
                <div className="offcanvas-header">
                    <div className="btn btn-close btn-close-white" data-bs-dismiss="offcanvas"></div>
                </div>
                <div className="offcanvas-body">
                <ul className='navbar-nav'>
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/about">About</Link>
                    </li>
                    <li className="nav-item">
                        {(isLoggedIn)?
                        (<button className="nav-link" onClick={logout} >Logout</button>):(
                        <Link className="nav-link" to="/login">Login</Link>)
                        }
                    </li>
                </ul>
                </div>
            </div>
        </nav>
    );
}