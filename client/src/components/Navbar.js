import React, {useEffect, useState} from "react";
import {NavLink} from "react-router-dom"
import { useUser } from "./UserContext";
import "../styling/Navbar.css"

function Navbar() {

  const {userId, logout} = useUser();

  function handleLogout() {
    logout()
  }

  return (
      <nav className="nav-bar">
        <div className="nav-bar-container">
          <div className="nav-links-container">
            <NavLink exact to="/" className="nav-links">Home</NavLink>
            {/* <NavLink exact to="/team-builder" className="nav-links">Team Builder</NavLink> */}
            <NavLink exact to="/roster-planner" className="nav-links">Roster Planner</NavLink>
            <NavLink exact to="/my-team" className="nav-links">My Team</NavLink>
            <NavLink exact to="/other-teams" className="nav-links">Other Teams</NavLink>
          </div>
          {/* <h1 className="nav-bar-title">Working title</h1> */}
          <div className="auth-links-container">
            {!userId &&
            <NavLink exact to="/login" className="auth-link">Login</NavLink>}
            {userId ?
            (<NavLink exact to="/" className="auth-link" onClick={handleLogout}>Logout</NavLink>
            ) : (<NavLink exact to="/register" className="auth-link">Register</NavLink>)}
          </div>
        </div>
      </nav>
    );
  }
  
  export default Navbar;