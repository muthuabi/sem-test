
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
