import React from "react";
import { FaBars } from "react-icons/fa";

const Header = () => {
  return (
    <header className="header">
      <div className="menu-icon">
        <FaBars />
      </div>
      <h4>Zomato Admin Panel</h4>
      {/* Additional header content */}
    </header>
  );
};

export default Header;
