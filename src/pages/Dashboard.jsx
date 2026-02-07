import { useAuth } from "../features/auth/AuthenticationContext";

function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Bienvenido {user?.name || user?.username}</p>

      <button onClick={logout}>
        Cerrar sesión
      </button>
    </div>
  );
}

export default Dashboard;
