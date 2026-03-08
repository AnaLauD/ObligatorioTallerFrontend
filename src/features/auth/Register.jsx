import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { register } from "../../api/authentication";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await register({ username, name, password });
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="register-form">
      <h2 className="register-title">Registro</h2>

      {error && <p className="register-error">{error}</p>}

      <input
        className="register-input"
        type="text"
        placeholder="Usuario"
        value={username}
        onChange={e => setUsername(e.target.value)}
        required
      />

      <input
        className="register-input"
        type="text"
        placeholder="Nombre completo"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />

      <input
        className="register-input"
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />

      <p className="login-register-text">
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" className="login-register-link">
            Inicia sesión
          </Link>
        </p>

      <button className="register-button" type="submit">
        Crear cuenta
      </button>
    </form>
  );
}

export default Register;
