import { useAuth } from "../features/auth/AuthenticationContext";
import Locales from "./Locales";
import "./css/Dashboard.css";

function Dashboard() {
  const { user, logout } = useAuth();

  
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

      <main className="dashboard-content">
        <Locales />
      </main>
    </div>
  );
}

export default Dashboard;
