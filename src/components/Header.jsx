import React from "react";

function Header({ activeTab, setActiveTab, user, logout }) {
  return (
    <header className="dashboard-header">

      <div className="dashboard-title">
        <p>Bienvenido {user?.name || user?.username}</p>
      </div>

      <div className="header-actions">

        <button
          className="create-local-btn"
          onClick={() => setActiveTab("createLocal")}
        >
          Crear Local
        </button>

        <button
          className="create-dish-btn"
          onClick={() => setActiveTab("createDish")}
        >
          Crear Plato
        </button>

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