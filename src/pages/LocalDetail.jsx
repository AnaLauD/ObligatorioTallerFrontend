import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getLocalById } from "../api/LocalsApi";
import { useAuth } from "../features/auth/AuthenticationContext";
import Header from "../components/Header";
import "./css/LocalDetail.css";

function LocalDetail() {

const { user, logout } = useAuth();
  const { id } = useParams();
  const [local, setLocal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");


    console.log("Obteniendo detalle del local con ID:", id);    

    getLocalById(id, token)
      .then(data => {
        setLocal(data);
        console.log("Local obtenido:", data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="loading">Cargando...</p>;
  if (!local) return <p>No se encontró el local</p>;

  return (
<>
    <Header activeTab={null} setActiveTab={null} user={user} logout={logout} />

    <div className="local-detail">

      {/* Imagen principal */}
      <div className="local-image">
        <img
          src={local.photos?.[0] ? local.photos[0] : "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/08/46/38/cb/de-tarde.jpg?w=900&h=500&s=1"}
          alt={local.name}
        />
      </div>

      {/* Información */}
      <div className="local-info">
        <h2>{local.name}</h2>
        <span className="local-type">{local.type}</span>

        <p className="local-description">
          {local.description || "Sin descripción"}
        </p>

        <div className="local-data">
          <p><strong>📍 Dirección:</strong> {local.address}</p>
          <p><strong>🏙 Ciudad:</strong> {local.city}</p>
          <p><strong>📌 Zona:</strong> {local.zone}</p>
          <p><strong>🕒 Horario:</strong> {local.hours}</p>
          <p><strong>💲 Precio:</strong> {local.priceRange}</p>
        </div>

        <div className="local-rating">
          ⭐ {local.ratingAverage} ({local.ratingCount} opiniones)
        </div>

        <div className="local-creator">
          Creado por {local.creator?.name}
        </div>
      </div>
    </div>
    </>
  );
}

export default LocalDetail;