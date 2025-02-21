import React from 'react';
import styles from '../Styles/SideBar.module.css';  // Importando o arquivo CSS como módulo

const Sidebar = () => {
  return (
    <div className={styles.sideBar}>
      <div className={styles.sideContent}>
        <h3>Menu Ajuda</h3>
        <ul>
          <li>Funções</li>
          <li>Operadores</li>
          <li>Tipos de saída</li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
