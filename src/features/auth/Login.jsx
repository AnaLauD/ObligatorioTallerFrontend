import { useState } from "react";
import { useAuth } from "./AuthenticationContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login({ username, password });
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h2 className="login-title">Iniciar sesion</h2>

      {error && <p className="login-error">{error}</p>}

      <input
        className="login-input"
        type="text"
        placeholder="Usuario"
        value={username}
        onChange={e => setUsername(e.target.value)}
        required
      />

      <input
        className="login-input"
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />

      <p className="login-register-text">
          ¿No tienes una cuenta aún?{" "}
          <Link to="/register" className="login-register-link">
            Regístrate
          </Link>
        </p>

      <button
        className="login-button"
        type="submit"
        disabled={loading}
      >
        {loading ? "Ingresando..." : "Entrar"}
      </button>
    </form>
  );
}

export default Login;
