import React from 'react';
import { useNavigate } from 'react-router-dom';
import bg from '../images/foxlimg.png'; // ✅ make sure this path is correct
import './Navbar.css';

export default function Navbar() {
  const nav = useNavigate();

  return (
    <header className="navbar">
      {/* Left: Logo + Name (clickable) */}
      <div
        className="nav-left"
        onClick={() => nav('/')} // ✅ navigate to home
        style={{ cursor: 'pointer' }} // ✅ show hand cursor
      >
        <img 
          src={bg}
          alt="Company Logo"
          className="nav-logo"
        />
        <span className="company-name">FOXLINT</span>
      </div>

      {/* Center: Website */}
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
