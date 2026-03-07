import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { getLocalById } from "../api/LocalsApi";
import { useAuth } from "../features/auth/AuthenticationContext";
import { createReview } from "../api/LocalsApi";
import Header from "../components/Header";
import "./css/LocalDetail.css";

function LocalDetail() {

const { user, logout } = useAuth();
  const { id } = useParams();
  const [local, setLocal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const token = localStorage.getItem("token");


  useEffect(() => {

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

  const handleSubmitReview = async (e) => {
  e.preventDefault();

  try { 

    const data = {
      rating: Number(rating),
      comment: comment
    };

    await createReview(id, token, data);

    alert("Review creada correctamente");

    setComment("");
    setRating(5);

  } catch (error) {
    console.error(error);
    alert("Error al crear la review");
  }
};

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
          Creado por{" "}
          <Link to={`/user/${local.creator?.id}`}>
            {local.creator?.name}
          </Link>
        </div>
      </div>
    </div>

    <div className="review-section">
    <div className="review-form">
  <h3>Dejar una opinión</h3>

  <form onSubmit={handleSubmitReview}>
    
    <label>Puntuación:</label>
    <select value={rating} onChange={(e) => setRating(e.target.value)}>
      <option value="1">1 ⭐</option>
      <option value="2">2 ⭐</option>
      <option value="3">3 ⭐</option>
      <option value="4">4 ⭐</option>
      <option value="5">5 ⭐</option>
    </select>

    <label>Comentario:</label>
    <textarea
      value={comment}
      onChange={(e) => setComment(e.target.value)}
      placeholder="Escribe tu opinión..."
      required
    />

    <button type="submit">Enviar review</button>
  </form>
</div>
</div>
    </>
  );
}

export default LocalDetail;