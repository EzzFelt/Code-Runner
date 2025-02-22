import React from 'react'; // Importing the React library
import Sidebar from './SideBar'; // Importing the Sidebar component
import MainContent from './MainContent'; // Importing the MainContent component
import styles from "./styles.module.css"; // Importing CSS module for styling

const Layout = () => { // Defining a functional component named Layout
  return (
    <div className={styles.container}> {/* Applying CSS class from the imported styles */}
      <Sidebar /> {/* Rendering the Sidebar component */}
      <MainContent /> {/* Rendering the MainContent component */}
    </div>
  );
};

export default Layout; // Exporting the Layout component as the default export