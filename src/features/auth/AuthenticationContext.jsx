import { createContext, useContext, useState } from "react";
import { login, register } from "../../api/authentication";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(
    () => localStorage.getItem("token")
  );

  const handleLogin = async (credentials) => {
    const data = await login(credentials);

    setUser(data.user);
    setToken(data.token);
    localStorage.setItem("token", data.token);
  };

  const handleRegister = async (userData) => {
    const data = await register(userData);

    if (data.token) {
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem("token", data.token);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login: handleLogin,
        register: handleRegister,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
