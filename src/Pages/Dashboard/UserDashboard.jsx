import React, { useState, useRef } from "react";
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
import UserDashboardCharts from "./UserDashboardCharts";

const UserDashboard = () => {
  const [isAsideVisible, setIsAsideVisible] = useState(false);
  const [item, setItem] = useState("General");
  const mainContentRef = useRef(null);

  const toggleAside = () => {
    setIsAsideVisible(!isAsideVisible);
  };

  const handleItemClick = (selectedItem) => {
    setItem(selectedItem);
    toggleAside();
    // Smooth scroll to main content
    if (mainContentRef.current) {
      mainContentRef.current.scrollIntoView({ behavior: 'smooth' });
    }
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
          <li onClick={() => handleItemClick("General")}>
            <FaHome className="icon" />
            General
          </li>
          <li onClick={() => handleItemClick("Stats")}>
            <FaChartBar className="icon" />
            Stats
          </li>
          <li onClick={() => handleItemClick("Visuals")}>
            <FaChartPie className="icon" />
            Visuals
          </li>
          <li onClick={() => handleItemClick("Profile")}>
            <FaUser className="icon" />
            Profile
          </li>
        </ul>
      </aside>
      <main ref={mainContentRef}>
        <div className="main-content">
          {(() => {
            switch (item) {
              case "General":
                return <div>General Content</div>;
              case "Stats":
                return <div>Statistics Content</div>;
              case "Visuals":
                return <UserDashboardCharts />;
              case "Profile":
                return <UserProfile />;
              default:
                return <div>Select an option</div>;
            }
          })()}
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
