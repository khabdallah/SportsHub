import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">🏟️ SportHub</div>
      <div className="navbar-links">
        <NavLink to="/"   end className="nav-link">Home</NavLink>
        <NavLink to="/create" className="nav-link">New Post</NavLink>
      </div>
    </nav>
  );
}
