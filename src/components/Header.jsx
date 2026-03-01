import React from 'react';

function Header ({ activeTab, setActiveTab, user, logout }) {
  return (
    <>
      <header className="dashboard-header">
        <div className="dashboard-title">
          <p>Bienvenido {user?.name || user?.username}</p>
        </div>

        <button className="logout-btn" onClick={logout}>
          Cerrar sesión
        </button>
      </header>
      
        </>
  )
}

export default Header;