import React from 'react';
import './index.css'; 
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import UserLogin from './Pages/Login/UserLogin/UserLogin';
import AdminLogin from './Pages/Login/AdminLogin/AdminLogin';
import TeacherSignup from './Pages/Signup/Teacher/TeacherSignup';

const Main = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="User-login" element={<UserLogin />} />          
          <Route path="Admin-login" element={<AdminLogin />} />
          <Route path="Teacher-Signup" element={<TeacherSignup />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Main />);
