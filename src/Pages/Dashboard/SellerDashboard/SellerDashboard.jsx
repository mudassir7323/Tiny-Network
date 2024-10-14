import React, { useState, useRef } from "react";
import {
  FaBars,
  FaTimes,
  FaChartBar,
  FaHome,
  FaChartPie,
  FaUser,
} from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { MdHomeRepairService } from "react-icons/md";
import "./SellerDashboard.css";
import SellerProfile from "./SellerProfile";
import SellerDashboardCharts from "./SellerDashboardCharts";
import SellerDashboardStats from "./SellerDashboardStats";
import SellerDashboardGeneral from "./SellerDashboardGeneral";
import SellerJobs from "./SellerJobs";
import SellerLogout from "./SellerLogout";

const SellerDashboard = () => {
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
          <li onClick={() => handleItemClick("Profile")}>
            <FaUser className="icon" />
            Profile
          </li>
          <li onClick={() => handleItemClick("Jobs")}>
            <MdHomeRepairService className="icon" />
            Jobs
          </li>
          <li onClick={() => handleItemClick("Logout")}>
            <IoMdLogOut className="icon" />
            Logout
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
                    <SellerDashboardGeneral />
                  </div>
                );
              case "Stats":
                return (
                  <div>
                    <SellerDashboardStats />
                  </div>
                );
              case "Visuals":
                return <SellerDashboardCharts />;
              case "Profile":
                return <SellerProfile />;
              case "Logout":
                return <SellerLogout />;
              case "Jobs":
                return <SellerJobs />;
              default:
                return <div>Select an option</div>;
            }
          })()}
        </div>
      </main>
    </div>
  );
};

export default SellerDashboard;
