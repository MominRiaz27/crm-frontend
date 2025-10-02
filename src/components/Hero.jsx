import React from 'react'
import { Link } from 'react-router-dom'
import './Hero.css'
import bg from '../images/bg.jpg';


export default function Hero({ children }) {
  return (
    <div className="hero" style={{ backgroundImage: `url(${bg})` }}>
      {/* Navbar */}
      <div className="navbar">
        <h2 className="logo">CRM Reminder</h2>
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/reminders">Reminders</Link>
          <Link to="/clients">All Clients</Link>
          <Link to="/add">Add</Link>
          <Link to="/search">Search</Link>
        </nav>
      </div>

      {/* Hero Content */}
      <div className="hero-content">
        <h1>Keep your follow-ups on time</h1>
        <p>A simple CRM to track follow-ups and reminders for your marketing team.</p>
      </div>

      {/* Children (blocks will come here) */}
      <div className="hero-children">
        {children}
      </div>
    </div>
  )
}
