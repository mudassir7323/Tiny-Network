import React, { useState, useRef } from "react";
import {
  FaBars,
  FaTimes,
  FaChartBar,
  FaHome,
  FaChartPie,
  FaUser,
} from "react-icons/fa";
import { IoGitPullRequestSharp } from "react-icons/io5";
import { MdOutlineMiscellaneousServices } from "react-icons/md";
import "./AdminDashboard.css";
import UserDashboardCharts from "./AdminDashboardCharts";
import UserDashboardStats from "./AdminDashboardStats";
import UserDashboardGeneral from "./AdminDashboardGeneral";
import AllUsers from "./AllUsers";
import Requests from "./Requests";
import Services from "./Services";

const AdminDashboard = () => {
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
      mainContentRef.current.scrollIntoView({ behavior: "smooth" });
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
          <li onClick={() => handleItemClick("Users")}>
            <FaUser className="icon" />
            Users
          </li>
          <li onClick={() => handleItemClick("Requests")}>
            <IoGitPullRequestSharp className="icon" />
            Requests
          </li>
          <li onClick={() => handleItemClick("Services")}>
            <MdOutlineMiscellaneousServices className="icon" />
            Services
          </li>
        </ul>
      </aside>
      <main ref={mainContentRef}>
        <div className="main-content">
          {(() => {
            switch (item) {
              case "General":
                return (
                  <div>
                    <UserDashboardGeneral />
                  </div>
                );
              case "Stats":
                return (
                  <div>
                    <UserDashboardStats />
                  </div>
                );
              case "Visuals":
                return <UserDashboardCharts />;
              case "Users":
                return <AllUsers />;
              case "Requests":
                return <Requests />;
              case "Services":
                return <Services />;
              default:
                return <div>Select an option</div>;
            }
          })()}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
