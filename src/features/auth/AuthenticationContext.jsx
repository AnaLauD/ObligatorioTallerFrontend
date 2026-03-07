import { createContext, useContext, useState } from "react";
import { login, register } from "../../api/authentication";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
  () => JSON.parse(localStorage.getItem("user"))
);
  const [token, setToken] = useState(
    () => localStorage.getItem("token")
  );

  const handleLogin = async (credentials) => {
    const data = await login(credentials);

    setUser(data.user);
    setToken(data.token);
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

  };

  const handleRegister = async (userData) => {
    const data = await register(userData);

    if (data.token) {
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
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
