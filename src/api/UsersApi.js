const BASE_URL = "https://api-react-taller-production.up.railway.app";

export const register = async (username, name, password) => {

  const response = await fetch(`${BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ username, name, password })
  });

  const data = await response.json();
  console.log("Informacion de Registro", data);

  return data;
};

export const login = async (username, password) => {

  const response = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ username, password })
  });

  const data = await response.json();

  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));

  return data;
};

export const getUserById = async (id, token) => {

  const response = await fetch(`${BASE_URL}/api/users/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error("Error al obtener usuario");
  }

  const data = await response.json();
  return data.item;
};