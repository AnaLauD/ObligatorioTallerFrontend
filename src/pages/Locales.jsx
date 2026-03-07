import { useEffect, useState } from "react";
import LocalCard from "../components/LocalCard";
import { getLocales } from "../api/LocalsApi";
import "./css/Locales.css";

function Locales() {
  const [locales, setLocales] = useState([]);
  const [loading, setLoading] = useState(true);

  // filtros
  const [tipo, setTipo] = useState("");
  const [precio, setPrecio] = useState("");
  const [puntuacion, setPuntuacion] = useState("");
  const [zona, setZona] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoading(true);

    getLocales(token, {
      type: tipo,
      priceRange: precio,
      rating: puntuacion,
      zone: zona
    })
      .then(data => {
        console.log("Locales obtenidos:", data);
        setLocales(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [tipo, precio, puntuacion, zona]);

  const handleVerDetalle = (id) => {
    console.log("Ver detalle del local:", id);

  };

  return (
    <div className="page-locales">
      <h2>Locales gastronómicos</h2>

      {/* FILTROS */}
      <div className="filtros">
        <select value={tipo} onChange={e => setTipo(e.target.value)}>
          <option value="">Todos los tipos</option>
          <option value="RESTAURANTE">Restaurante</option>
          <option value="CAFETERIA">Cafetería</option>
          <option value="BAR">Bar</option>
          <option value="FOOD_TRUCK">Food Truck</option>
          <option value="OTROS">Otros</option>
        </select>

        <select value={precio} onChange={e => setPrecio(e.target.value)}>
          <option value="">Todos los precios</option>
          <option value="ECONOMICO">Económico</option>
          <option value="MEDIO">Medio</option>
          <option value="ALTO">Alto</option>
        </select>

        <select value={puntuacion} onChange={e => setPuntuacion(e.target.value)}>
          <option value="">Cualquier puntuación</option>
          <option value="1">1 ⭐ o más</option>
          <option value="2">2 ⭐ o más</option>
          <option value="3">3 ⭐ o más</option>
          <option value="4">4 ⭐ o más</option>
          <option value="5">5 ⭐</option>
        </select>

        <input
          type="text"
          placeholder="Zona"
          value={zona}
          onChange={e => setZona(e.target.value)}
        />
      </div>

      {/* CARDS */}
      <div className="cards">
            {loading ? (
        <p className="loading">Cargando locales...</p>
    ) : locales.length === 0 ? (
        <p>No hay locales con esos filtros</p>
    ) : (
        locales.map(local => (
        <LocalCard
            key={local.id}
            local={local}
            onVerDetalle={handleVerDetalle}
        />
        ))
        )}
      </div>
    </div>
  );
}

export default Locales;
