import React from 'react'
import './Navbar.css'

export default function Navbar() {
  return (
    <header className="navbar">
      {/* Left: Logo + Name */}
      <div className="nav-left">
        <img 
          src="/logo192.png" 
          alt="Company Logo" 
          className="nav-logo" 
        />
        <span className="company-name">CRM Reminder</span>
      </div>

      {/* Center: Email */}
      <div className="nav-center">
        <a href="mailto:info@crmreminder.com">info@crmreminder.com</a>
      </div>

      {/* Right: Timings */}
      <div className="nav-right">
        <span>Mon - Fri: 9 AM – 7 PM</span>
      </div>
    </header>
  )
}
