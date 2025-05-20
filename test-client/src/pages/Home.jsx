import railImg from '../assets/images/rail1.jpg';
import sydImg from "../assets/images/syd.jpeg";
import { Link,Outlet } from 'react-router-dom';
import Navbar from './Navbar';
export default function Home() {
  return (
    <div>
        <Navbar/>
        <Outlet/>
    </div>
  );
}
