import React from 'react';
import Sidebar from './SideBar';
import MainContent from './MainContent';
import styles from "./styles.module.css"

const Layout = () => {
  return (
    <div className={styles.container}>
      <Sidebar />
      <MainContent />
    </div>
  );
};

export default Layout;