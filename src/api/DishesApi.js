const BASE_URL = "https://api-react-taller-production.up.railway.app/api";

export const getDishes = async (token, filtros = {}) => {
  const params = new URLSearchParams();

  if (filtros.name) params.append("q", filtros.name);
  if (filtros.category) params.append("category", filtros.category);
  if (filtros.city) params.append("city", filtros.city);
  if (filtros.local) params.append("localId", filtros.local);
  if (filtros.dateStarted) params.append("dateFrom", filtros.dateStarted);
  if (filtros.dateFinished) params.append("dateTo", filtros.dateFinished);
  const queryString = params.toString()
    ? `?${params.toString()}`
    : "";

  const res = await fetch(`${BASE_URL}/dishes${queryString}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });

  if (!res.ok) {
    throw new Error("Error al obtener dishes");
  }

  const data = await res.json();
  return data.items;
};

  export const getDishById = async (id, token) => {

  console.log("Obteniendo dish con ID:", id);

  const res = await fetch(
    `https://api-react-taller-production.up.railway.app/api/dishes/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }
  );

  if (!res.ok) {
    throw new Error("Error al obtener dish");
  }

  const data = await res.json();
  return data.item;
};

export const getReview = async (id, token) => {
  const res = await fetch(
    `https://api-react-taller-production.up.railway.app/api/dishes/${id}/reviews`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }
  );
  if (!res.ok) {
    throw new Error("Error al obtener review");
  }
  return await res.json();
};

export const createDish = async (token, data) => {
  const res = await fetch("https://api-react-taller-production.up.railway.app/api/dishes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    throw new Error("Error al crear plato");
  }

  return await res.json();
};
