export const login = async (data) => {
  const res = await fetch("https://api-react-taller-production.up.railway.app/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    throw new Error("Credenciales inválidas");
  }

  return res.json();
};

export const register = async (data) => {
  const res = await fetch("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    throw new Error("Error al registrar usuario");
  }

  return res.json();
};
