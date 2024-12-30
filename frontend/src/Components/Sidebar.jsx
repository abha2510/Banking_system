import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaBars } from "react-icons/fa";
import { GrTransaction } from "react-icons/gr";
import { FaHandHoldingUsd } from "react-icons/fa";
import { IoSettings, IoLogOut } from "react-icons/io5";
import "../Style/Sidebar.css";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div className="hamburger" onClick={toggleSidebar}>
        <FaBars />
      </div>
      <div className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
        <h2 className="sidebar-logo">Bank AJ</h2>
        <ul className="sidebar-menu">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active-link" : undefined)}
              onClick={() => setIsSidebarOpen(false)}
            >
              <FaHome /> <span className="side-text">Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/transaction"
              className={({ isActive }) => (isActive ? "active-link" : undefined)}
              onClick={() => setIsSidebarOpen(false)}
            >
              <GrTransaction /> <span className="side-text">Transaction</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/payment"
              className={({ isActive }) => (isActive ? "active-link" : undefined)}
              onClick={() => setIsSidebarOpen(false)}
            >
            <FaHandHoldingUsd />
              <span className="side-text">Loan Request</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/settings"
              className={({ isActive }) => (isActive ? "active-link" : undefined)}
              onClick={() => setIsSidebarOpen(false)}
            >
              <IoSettings /> <span className="side-text">Settings</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/logout"
              className={({ isActive }) => (isActive ? "active-link" : undefined)}
              onClick={() => setIsSidebarOpen(false)}
            >
              <IoLogOut />
              <span className="side-text">Logout</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
