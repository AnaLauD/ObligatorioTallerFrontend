import React from "react";
import { Link } from "react-router-dom";
import "./css/Header.css";

function Header({ activeTab, setActiveTab, user, logout }) {
  return (
    <header className="dashboard-header">

      <div className="dashboard-title">
        <p>Bienvenido {user?.name || user?.username}</p>
      </div>

      <div className="header-actions">

        <Link to="/dashboard" className="home-btn">
          Inicio
        </Link>

        <Link to="/create-local" className="create-local-btn">
            Crear Local
        </Link>

        <Link to="/create-dish" className="create-dish-btn">
          Crear Plato
        </Link>

        <Link to="/profile" className="profile-btn">
          Mi Perfil
        </Link>

        <button
          className="logout-btn"
          onClick={logout}
        >
          Cerrar sesión
        </button>

      </div>

    </header>

  );
}


export default Header;