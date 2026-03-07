import { useState, useEffect, use } from "react";
import { getLocales } from "../api/LocalsApi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../features/auth/AuthenticationContext";
import Header from "../components/Header";
import { createDish } from "../api/DishesApi";
import "./css/CreateDishes.css";

function CreateDish() {

  const { user, logout } = useAuth();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [localId, setLocalId] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const [locales, setLocales] = useState([]);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchLocals = async () => {
        try {
            const data = await getLocales(token);
            setLocales(data);
        } catch (error) {
            console.error("Error fetching locals:", error);
        } 
    };  
    fetchLocals();
    }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const data = {
        name,
        category,
        localId: Number(localId),
        city,
        price: Number(price),
        description
      };

      const res = await createDish(token, data);

      console.log("Plato creado:", res);

      alert("Plato creado correctamente");

      navigate("/dashboard");

        setName("");
        setCategory("");
        setLocalId("");
        setCity("");
        setPrice("");
        setDescription("");

    } catch (err) {
      console.error(err);
      alert("Error al crear el plato");
    }
  };

  return (
    <>
    <Header activeTab={null} setActiveTab={null} user={user} logout={logout} />
    <div className="create-dish">

      <h2>Crear Plato</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Nombre del plato"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Categoría</option>
          <option value="entrada">Entrada</option>
          <option value="principal">Principal</option>
          <option value="postre">Postre</option>
          <option value="bebida">Bebida</option>
        </select>

        <select
    value={localId}
    onChange={(e) => setLocalId(Number(e.target.value))} // guardamos el id
    required
  >
    <option value="">-- Selecciona un local --</option>
    {locales.map((local) => (
      <option key={local.id} value={local.id}>
        {local.name} {/* aquí mostramos el nombre */}
      </option>
    ))}
  </select>

        <input
          type="text"
          placeholder="Ciudad"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Precio"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <textarea
          placeholder="Descripción del plato"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">Crear Plato</button>

      </form>

    </div>
    </>
  );
}

export default CreateDish;