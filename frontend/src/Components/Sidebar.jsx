import React from "react";
import { NavLink } from "react-router-dom";
import "../Style/Sidebar.css";
import { FaHome } from "react-icons/fa";
import { GrTransaction } from "react-icons/gr";
import { MdPayments } from "react-icons/md";
import { FaAddressCard } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { IoLogOut } from "react-icons/io5";

const Sidebar = () => {
    return (
        <div className="sidebar">
            <h2 className="sidebar-logo">Bank El</h2>
            <ul className="sidebar-menu">
                <li>
                    <NavLink
                        to="/"
                        className={({ isActive }) => (isActive ? "active-link" : undefined)}
                    >
                    <FaHome /> <span className="side-text">Dashboard</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/transaction"
                        className={({ isActive }) => (isActive ? "active-link" : undefined)}
                    >
                    <GrTransaction /> <span className="side-text">Transaction</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/payment"
                        className={({ isActive }) => (isActive ? "active-link" : undefined)}
                    >
                      <MdPayments /><span className="side-text">Payment</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/card"
                        className={({ isActive }) => (isActive ? "active-link" : undefined)}
                    >
                       <FaAddressCard /> <span className="side-text">Card</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/settings"
                        className={({ isActive }) => (isActive ? "active-link" : undefined)}
                    >
                       <IoSettings /> <span className="side-text">Settings</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/logout"
                        className={({ isActive }) => (isActive ? "active-link" : undefined)}
                    >
                     <IoLogOut /><span className="side-text">Logout</span>
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
