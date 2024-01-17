import React from 'react';
import { NavLink } from 'react-router-dom';
import ThemeSwitcherButton from '../buttons/ThemeSwitcherButton';
import './Navbar.css';

const Navbar = () => {
    return (
        <div className="navbar">
            <h1>Automated Analysis of Metaheuristics</h1>

            <ul>
                <li>
                  <NavLink 
                    to="/" 
                    className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                    end
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="/search" 
                    className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                  >
                    Search
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="/analyser" 
                    className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                  >
                    Analyser
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="/docs" 
                    className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                  >
                    Documentation
                  </NavLink>
                </li>
            </ul>

            <ThemeSwitcherButton />
        </div>
    );
}

export default Navbar;

