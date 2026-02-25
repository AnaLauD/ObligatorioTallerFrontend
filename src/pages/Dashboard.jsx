import { useState } from "react";
import { useAuth } from "../features/auth/AuthenticationContext";
import Locales from "./Locales";
import Dishes from "./Dishes";
import "./css/Dashboard.css";

function Dashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("locales");

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="dashboard-title">
          <h1>Dashboard</h1>
          <p>Bienvenido {user?.name || user?.username}</p>
        </div>

        <button className="logout-btn" onClick={logout}>
          Cerrar sesión
        </button>
      </header>

      {/* TABS */}
      <div className="dashboard-tabs">
        <button
          className={activeTab === "locales" ? "active" : ""}
          onClick={() => setActiveTab("locales")}
        >
          Locales
        </button>

        <button
          className={activeTab === "dishes" ? "active" : ""}
          onClick={() => setActiveTab("dishes")}
        >
          Platos
        </button>
      </div>

      <main className="dashboard-content">
        {activeTab === "locales" && <Locales />}
        {activeTab === "dishes" && <Dishes />}
      </main>
    </div>
  );
}

export default Dashboard;