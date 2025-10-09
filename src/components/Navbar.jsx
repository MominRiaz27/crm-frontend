import React from 'react';
import bg from '../images/foxlimg.png'; // ✅ add correct file extension
import './Navbar.css';

export default function Navbar() {
  return (
    <header className="navbar">
      {/* Left: Logo + Name */}
      <div className="nav-left">
        <img 
          src={bg} // ✅ no "url()"
          alt="Company Logo" 
          className="nav-logo" 
        />
        <span className="company-name">FOXLINT</span>
      </div>

      {/* Center: Email */}
      <div className="nav-center">
        <a href="mailto:info@crmreminder.com">www.foxlint.com</a>
      </div>

      {/* Right: Timings */}
      <div className="nav-right">
        <span>Mon - Fri: 9 AM – 7 PM</span>
      </div>
    </header>
  );
}
