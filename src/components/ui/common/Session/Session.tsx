// Session.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Session.module.css";
import { useAuth } from "../../../../hooks/useAuth";

export const Session: React.FC = () => {
  const { isAuthenticated, username, role, logout } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleIconClick = () => {
    if (isAuthenticated) {
      setIsDropdownOpen(!isDropdownOpen);
    } else {
      navigate("/login");
    }
  };

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    navigate("/login");
  };

  return (
    <div className={styles.sessionContainer}>
      {isAuthenticated && role !== "INVITADO" && (
        <span>Bienvenido {username}</span>
      )}
      {isAuthenticated && <span className={styles.divider}> | </span>}
      {isAuthenticated && <span>Rol: {role}</span>}
      <span
        className={`material-symbols-outlined ${styles.icon}`}
        onClick={handleIconClick}
      >
        account_circle
      </span>
      {isDropdownOpen && (
        <div className={styles.dropdown}>
          <div className={styles.dropdownItem} onClick={handleLogout}>
            Cerrar Sesión
          </div>
        </div>
      )}
    </div>
  );
};
