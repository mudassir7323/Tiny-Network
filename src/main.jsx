import React from 'react';
import './index.css'; 
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import UserLogin from './Pages/Login/UserLogin/UserLogin';
import AdminLogin from './Pages/Login/AdminLogin/AdminLogin';
import UserDashboard from './Pages/Dashboard/UserDashboard/UserDashboard';
import Signup from './Pages/Signup/Signup';
import BuyerSignup from './Pages/Signup/BuyerSignup/BuyerSignup';
import Home from "./Pages/Home/Home"
import AdminDashboard from "./Pages/Dashboard/AdminDashboard/AdminDashboard"
import SignupMenu from './Pages/Signup/SignupMenu';

const Main = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<Home />}/>
          <Route path="User-login" element={<UserLogin />} />            
          <Route path="Signup" element={<Signup />} />          
          <Route path="Buyer-Signup" element={<BuyerSignup />} />          
          <Route path="Admin-login" element={<AdminLogin />} />
          <Route path="UserDashboard" element={<UserDashboard />} />
          <Route path="AdminDashboard" element={<AdminDashboard />} />
          <Route path="SignupMenu" element={<SignupMenu />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Main />);
