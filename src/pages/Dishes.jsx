import { useEffect, useState } from "react";
import { getDishes } from "../api/DishesApi";
import { getLocales } from "../api/LocalsApi";
import DishCard from "../components/DishCard";
import "./css/Dishes.css";

function Dishes() {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [category, setCategory] = useState("");
  const [city, setCity] = useState("");
  const [dateStarted, setDateStarted] = useState("");
  const [dateFinished, setDateFinished] = useState("");
  const [locales, setLocales] = useState([]);
  const [local, setLocal] = useState("");
  const token = localStorage.getItem("token");

   useEffect(() => {

  getLocales(token)
    .then(data => {
      console.log("Locales obtenidos:", data);
      setLocales(data);
    })
    .catch(err => {
      console.error("Error al obtener locales", err);
    });
}, []);

  useEffect(() => {
    setLoading(true);

    console.log("filtros local:" + local);

    getDishes(token, {
      category,
      city,
      dateStarted,
      dateFinished,
      local,
    })
      .then(data => {
        setDishes(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [category, city, dateStarted, dateFinished, local]);

  return (
    <div className="page-dishes">
      <h2>Platos</h2>

      <div className="filtros">
        <select value={category} onChange={e => setCategory(e.target.value)}>
          <option value="">Todas las categorías</option>
          <option value="ENTRADA">Entrada</option>
          <option value="PRINCIPAL">Principal</option>
          <option value="POSTRE">Postre</option>
          <option value="BEBIDA">Bebida</option>
          <option value="OTROS">Otros</option>
        </select>

        <input
          type="text"
          placeholder="Ciudad"
          value={city}
          onChange={e => setCity(e.target.value)}
        />

        <select value={local} onChange={e => setLocal(e.target.value)}>
  <option value="">Todos los locales</option>

  {[...locales] 
    .sort((a, b) => a.name.localeCompare(b.name))
    .map(loc => (
      <option key={loc.id} value={loc.id}>
        {loc.name}
      </option>
    ))}
</select>

        <input
          type="date"
          placeholder="Fecha inicio"
          value={dateStarted}
          onChange={e => setDateStarted(e.target.value)}
        />

        <input
          type="date"
          placeholder="Fecha fin"
          value={dateFinished}
          onChange={e => setDateFinished(e.target.value)}
        />
  
      </div>

      <div className="cards">
        {loading ? (
          <p className="loading">Cargando platos...</p>
        ) : dishes.length === 0 ? (
          <p>No hay platos con esos filtros</p>
        ) : (
          dishes.map(dish => (
            <DishCard key={dish.id} dish={dish} />
          ))
        )}
      </div>
    </div>
  );
}

export default Dishes;