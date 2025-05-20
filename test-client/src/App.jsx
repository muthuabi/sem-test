import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.css';
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./assets/css-js/app.css";

import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import HeroSection from './pages/HeroSection';
import PageNotFound from './pages/PageNotFound';
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthProvider } from './contexts/AuthContext';
function App() {
  return (
   
    <Router>
       <AuthProvider>
      <ToastContainer stacked/>
      <main className="main-container container-fluid m-0 p-0">
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/" element={<Home />}>
              <Route index element={<HeroSection/>}/>
              <Route path="/about" element={<AboutUs/>}/>
          </Route>
          <Route path="*" element={<PageNotFound/>}/>
        </Routes>
      </main>
      </AuthProvider>
    </Router>
    
  );
}

export default App;
