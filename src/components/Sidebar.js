import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaClipboardList, FaUserPlus } from "react-icons/fa";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <ul className="sidebar-nav">
        <li>
          <NavLink exact to="/" activeClassName="active">
            <FaHome className="mr-3" />
            <span>Dashboard</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/resturant" activeClassName="active">
            <FaClipboardList className="mr-3" />
            <span>Resturant</span>
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
