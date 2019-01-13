import React from "react"
import { NavLink } from "react-router-dom"

export default () => (
    <nav className="navbar is-primary">
        <div className="navbar-brand">
        </div>

        <div className="navbar-menu">
            <div className="navbar-start">
                <NavLink className="navbar-item" to="/">Home</NavLink>
                <NavLink className="navbar-item" to="/submit">Submit Issue</NavLink>
                <NavLink className="navbar-item" to="/register">Register</NavLink>
                <NavLink className="navbar-item" to="/search">Search</NavLink>
                <NavLink className="navbar-item" to="/userlist">User List</NavLink>
            </div>
            
        </div>
    </nav>
)