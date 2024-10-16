import React from 'react';
import './index.css'; 
import App from './App';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from "./Pages/Home/Home"
import Login from './Pages/Login/Login';
import UserLogin from "./Pages/Login/UserLogin/UserLogin";
import AdminLogin from './Pages/Login/AdminLogin/AdminLogin';
import UserDashboard from './Pages/Dashboard/UserDashboard/UserDashboard';
import AdminDashboard from "./Pages/Dashboard/AdminDashboard/AdminDashboard"
import BuyerDashboard from "./Pages/Dashboard/BuyerDashboard/BuyerDashboard";
import Signup from './Pages/Signup/Signup';
import SignupMenu from './Pages/Signup/SignupMenu';
import SignupForm from "./Pages/Signup/SignupForm";
import BuyerSignup from './Pages/Signup/BuyerSignup/BuyerSignup';
import AdminJobsView from './Pages/Dashboard/AdminDashboard/AdminJobsView';
import BuyerJobsView from './Pages/Dashboard/BuyerDashboard/BuyerJobsView';
import JobDetails from './Pages/Dashboard/UserDashboard/JobDetails';
import UserGeneralProfile from './Pages/Dashboard/AdminDashboard/UserGeneralProfile';
import UserGeneralProfile2 from './Pages/Dashboard/AdminDashboard/UserGeneralProfile2';
import ProtectedRoutesUser from "./Components/ProtectedRoutesUser";
import ProtectedRoutesAdmin from "./Components/ProtectedRoutesAdmin";
import CreateJobs from './Pages/Dashboard/BuyerDashboard/CreateJobs';

const Main = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<Home />}/>
          <Route path="Login" element={<Login />} />            
          <Route path="Admin-login" element={<AdminLogin />} />        
          <Route path="User-login" element={<UserLogin />} />          
          <Route path="Signup" element={<Signup />} />  
          <Route path="/SignupMenu" element={<SignupMenu />} />          
          <Route path="/SignupForm/:serviceId" element={<SignupForm />} />         
          <Route path="Buyer-Signup" element={<BuyerSignup />} />
          <Route path="/UserGeneralProfile/:id" element={<UserGeneralProfile />} />
          {/* Protected Routes   */}
          <Route path="AdminDashboard" element={<ProtectedRoutesAdmin element={<AdminDashboard />} />} />
          <Route path="/BuyerDashboard" element={<ProtectedRoutesUser element={<BuyerDashboard />} />} />
          <Route path="UserDashboard" element={<ProtectedRoutesUser element={<UserDashboard />} />} />   
          <Route path="/BuyerJobsView/:ID" element={<ProtectedRoutesUser element={<BuyerJobsView />} />} />  
          <Route path="/AdminJobsView/:ID" element={<ProtectedRoutesUser element={<AdminJobsView />} />} />                
          <Route path="/Jobdetails/:id" element={<ProtectedRoutesUser element={<JobDetails />} />} />
          <Route path="/UserGeneralProfile2/:id" element={<ProtectedRoutesAdmin element={<UserGeneralProfile2 />} />} />  
          <Route path="/CreateJobs" element={<ProtectedRoutesUser element={<CreateJobs />} />} />            
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Main />);
