export const getLocales = async (token, filtros = {}) => {
  const params = new URLSearchParams();

  if (filtros.type) params.append("type", filtros.type);
  if (filtros.priceRange) params.append("priceRange", filtros.priceRange);
  if (filtros.rating) params.append("rating", filtros.rating);
  if (filtros.zone) params.append("zone", filtros.zone);

  const res = await fetch(
    `https://api-react-taller-production.up.railway.app/api/locals?${params.toString()}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }
  );

  if (!res.ok) {
    throw new Error("Error al obtener locales");
  }

  const data = await res.json();
  return data.items; // 🔥 devolvemos directamente el array
};

