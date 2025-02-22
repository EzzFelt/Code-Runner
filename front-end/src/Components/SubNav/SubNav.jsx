import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './styles.module.css';  // Importing CSS as a module

// SubNavbar component definition
const SubNavbar = () => {
  return (
    // Navigation bar with a class from the CSS module
    <nav className={styles.subnavbar}>
      <ul>
        <li>
          {/* NavLink for Home route with active class from CSS module */}
          <NavLink to="/" activeClassName={styles.active}>
            Home
          </NavLink>
        </li>
        <li>
          {/* NavLink for Exercises route with active class from CSS module */}
          <NavLink to="/exercises" activeClassName={styles.active}>
            Exercícios
          </NavLink>
        </li>
        <li>
          {/* NavLink for Consults route with active class from CSS module */}
          <NavLink to="/consults" activeClassName={styles.active}>
            Consultas
          </NavLink>
        </li>
        {/* Add other links as needed */}
      </ul>
    </nav>
  );
};

// Exporting SubNavbar component as default
export default SubNavbar;
