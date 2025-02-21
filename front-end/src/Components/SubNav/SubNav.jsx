import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './styles.module.css';  // Importando o CSS como módulo

const SubNavbar = () => {
  return (
    <nav className={styles.subnavbar}>
      <ul>
        <li>
          <NavLink to="/" activeClassName={styles.active}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/exercises" activeClassName={styles.active}>
            Exercícios
          </NavLink>
        </li>
        <li>
          <NavLink to="/consults" activeClassName={styles.active}>
            Consultas
          </NavLink>
        </li>
        {/* Adicione outros links conforme necessário */}
      </ul>
    </nav>
  );
};

export default SubNavbar;
