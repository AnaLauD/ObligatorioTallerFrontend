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