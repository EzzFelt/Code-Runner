import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './styles.module.css';
import { UserContext } from '../../Contexts/UserContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { handleLogout } = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);

  // Retrieve token from local storage
  const token = localStorage.getItem('token');

  // Function to handle logout
  const logout = () => {
    handleLogout();
    navigate('/login');
  };

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.navbarItem}>
          {/* Logo */}
          <img className={styles.logo} src="/imgs/icon_coelho.png" alt="Logo" />
        </div>
        <div className={styles.navbarItem}>
          <span>
            {/* Configurations icon and text */}
            <img className={styles.icon} src="/imgs/icon_config.png" alt="Configurações" />
            Configurações
          </span>
          {token ? (
            // Show logout button if token exists
            <button onClick={() => setShowModal(true)} className={styles.logoutButton}>
              Sair
            </button>
          ) : (
            // Show login link if no token
            <Link to="/login">Entrar</Link>
          )}
        </div>
      </nav>

      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>Você realmente deseja sair?</h3>
            <div className={styles.modalButtons}>
              {/* Logout confirmation button */}
              <button className={styles.btnLogout} onClick={logout}>
                Sair
              </button>
              {/* Cancel button to close modal */}
              <button
                className={styles.btnCancel}
                onClick={() => setShowModal(false)}
              >
                Ficar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;