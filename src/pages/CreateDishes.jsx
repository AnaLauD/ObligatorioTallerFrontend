import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createDish } from "../api/DishesApi";
import "./css/CreateDishes.css";

function CreateDish() {

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [localId, setLocalId] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

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

        <input
          type="number"
          placeholder="ID del local"
          value={localId}
          onChange={(e) => setLocalId(e.target.value)}
          required
        />

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
  );
}

export default CreateDish;