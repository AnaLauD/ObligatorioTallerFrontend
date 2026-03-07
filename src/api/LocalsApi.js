export const getLocales = async (token, filtros = {}) => {
  const params = new URLSearchParams();

  if (filtros.type) params.append("type", filtros.type);
  if (filtros.priceRange) params.append("priceRange", filtros.priceRange);
  if (filtros.rating) params.append("rating", filtros.rating);
  if (filtros.zone) params.append("zone", filtros.zone);
  if (filtros.creatorId) params.append("creatorId", filtros.creatorId);

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
  return data.items;
};

export const getLocalById = async (id, token) => {

  console.log("Obteniendo local con ID:", id);

  const res = await fetch(
    `https://api-react-taller-production.up.railway.app/api/locals/${id}`, 
  {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    } )

     if (!res.ok) {
    throw new Error("Error al obtener locales");
  }

  const data = await res.json();

  console.log("Datos del local obtenido:", data);
  return data.item;

  }

 export const createReview = async (id, token, data) => {
  const res = await fetch(
    `https://api-react-taller-production.up.railway.app/api/locals/${id}/reviews`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    }
  );

  if (!res.ok) {
    throw new Error("Error al crear review");
  }

  return await res.json();
};

export const createLocal = async (token, data) => {
  const res = await fetch("https://api-react-taller-production.up.railway.app/api/locals", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    throw new Error("Error al crear local");
  }

  return await res.json();
};