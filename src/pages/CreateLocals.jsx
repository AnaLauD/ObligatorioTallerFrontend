import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createLocal } from "../api/LocalsApi";
import "./css/CreateLocals.css";

function CreateLocal() {

  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [zone, setZone] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [hours, setHours] = useState("");
  const [type, setType] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [photo, setPhoto] = useState(""); 
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const data = {
        name,
        city,
        zone,
        address,
        description,
        hours,
        type,
        priceRange,
        photos: photo ? [photo] : [] 
      };

      const res = await createLocal(token, data);

      console.log("Local creado:", res);

        alert("Local creado correctamente");

        navigate("/dashboard");

      setName("");
      setCity("");
      setZone("");
      setAddress("");
      setDescription("");
      setHours("");
      setType("");
      setPriceRange("");
      setPhoto("");

      } catch (err) {
      console.error(err);
      alert("Error al crear el local");
    }

  };

  return (
    <div className="create-local">

      <h2>Crear Local</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Nombre del local"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
          type="text"
          placeholder="Zona"
          value={zone}
          onChange={(e) => setZone(e.target.value)}
        />

        <input
          type="text"
          placeholder="Dirección"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <input
          type="text"
          placeholder="Horario (09:00 - 23:00)"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
        />

        <textarea
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* FOTO */}
        <input
          type="url"
          placeholder="Link de la foto (https://...)"
          value={photo}
          onChange={(e) => setPhoto(e.target.value)}
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
        >
          <option value="">Seleccionar tipo</option>
          <option value="RESTAURANTE">Restaurante</option>
          <option value="BAR">Bar</option>
          <option value="CAFE">Café</option>
        </select>

        <select
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          required
        >
          <option value="">Rango de precio</option>
          <option value="ECONOMICO">Económico</option>
          <option value="MEDIO">Medio</option>
          <option value="CARO">Caro</option>
        </select>

        <button type="submit">Crear Local</button>

      </form>

    </div>
  );
}

export default CreateLocal;