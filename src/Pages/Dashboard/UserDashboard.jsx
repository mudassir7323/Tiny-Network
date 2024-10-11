import React, { useState } from "react";
import {
  FaBars,
  FaTimes,
  FaChartBar,
  FaHome,
  FaChartPie,
  FaUser,
} from "react-icons/fa";
import "./UserDashboard.css";
import UserProfile from "./UserProfile";

const UserDashboard = () => {
  const [isAsideVisible, setIsAsideVisible] = useState(false);

  const toggleAside = () => {
    setIsAsideVisible(!isAsideVisible);
  };

  return (
    <div className="layout">
      <button className="toggle-btn" onClick={toggleAside}>
        {isAsideVisible ? <FaTimes /> : <FaBars />}
      </button>
      <aside className={isAsideVisible ? "show-aside" : ""}>
        <div>
          <h1>Tiny Task Network</h1>
        </div>
        <ul>
          <li>
            <FaHome className="icon" />
            General
          </li>
          <li>
            <FaChartBar className="icon" />
            Stats
          </li>
          <li>
            <FaChartPie className="icon" />
            Visuals
          </li>
          <li>
            <FaUser className="icon" />
            Profile
          </li>
        </ul>
      </aside>
      <main>
        {/* Your main content */}
        <div className="main-content">
          <UserProfile />
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
