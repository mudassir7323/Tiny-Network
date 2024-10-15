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
import "./BuyerDashboard.css";
import BuyerProfile from "./BuyerProfile";
import BuyerDashboardStats from "./BuyerDashboardStats";
import BuyerDashboardGeneral from "./BuyerDashboardGeneral";
import BuyerJobs from "./BuyerJobs";
import BuyerLogout from "./BuyerLogout";
import CreateJobs from "./CreateJobs";

const BuyerDashboard = () => {
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
          <li onClick={() => handleItemClick("Profile")}>
            <FaUser className="icon" />
            Profile
          </li>
          <li onClick={() => handleItemClick("Jobs")}>
            <MdHomeRepairService className="icon" />
            Listings
          </li>
          <li onClick={() => handleItemClick("Create")}>
            <MdHomeRepairService className="icon" />
            Create Jobs
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
                    <BuyerDashboardGeneral />
                  </div>
                );
              case "Stats":
                return (
                  <div>
                    <BuyerDashboardStats />
                  </div>
                );
              case "Profile":
                return <BuyerProfile />;
              case "Logout":
                return <BuyerLogout />;
              case "Jobs":
                return <BuyerJobs />;
              case "Create":
                return <CreateJobs />;
              default:
                return <div>Select an option</div>;
            }
          })()}
        </div>
      </main>
    </div>
  );
};

export default BuyerDashboard;
