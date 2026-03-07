import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getDishById, createReview } from "../api/DishesApi";
import { useAuth } from "../features/auth/AuthenticationContext";
import Header from "../components/Header";
import "./css/DishDetail.css";

function DishDetail() {
  const { user, logout } = useAuth();
  const { id } = useParams();
  const [dish, setDish] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const token = localStorage.getItem("token");
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    console.log("Obteniendo detalle del plato con ID:", id);

    getDishById(id, token)
      .then(data => {
        setDish(data);
        setReviews(data.reviews || []);
        setLoading(false);
        console.log("Plato obtenido:", data);
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

      setReviews(prev => [...prev, data]); 
      setComment("");
      setRating(5);

    } catch (error) {
      console.error(error);
      alert("Error al crear la review");
    }
  };

  const getReviewStats = (reviews) => {
    if (!reviews || reviews.length === 0) return { averageRating: 0, reviewCount: 0 };
    const total = reviews.reduce((sum, r) => sum + r.rating, 0);
    return { averageRating: Number((total / reviews.length).toFixed(1)), reviewCount: reviews.length };
  };

  if (loading) return <p className="loading">Cargando...</p>;
  if (!dish) return <p>No se encontró el plato</p>;

  const { averageRating, reviewCount } = getReviewStats(reviews);

  return (
    <>
      <Header activeTab={null} setActiveTab={null} user={user} logout={logout} />

        <div className="page-dish-detail">
        <div className="dish-detail">

        <div className="dish-info">
          <h2>{dish.name}</h2>
          <span className="dish-category">{dish.category}</span>
          <p className="dish-description">{dish.description || "Sin descripción"}</p>

          <div className="dish-data">
            <p><strong>📍 Ciudad:</strong> {dish.city}</p>
            <p><strong>🏠 Local:</strong> <Link to={`/local/${dish.local?.id}`}>{dish.local?.name}</Link></p>
            <p><strong>💲 Precio:</strong> ${dish.price}</p>
          </div>

          <div className="dish-rating">
            ⭐ {averageRating} ({reviewCount} opiniones)
          </div>

          <div className="dish-creator">
            Creado por <Link to={`/user/${dish.creator?.id}`}>{dish.creator?.name}</Link>
          </div>
        </div>
      </div>

      <div className="review-section">
        <div className="review-form">
          <h3>Dejar una opinión</h3>
          <form onSubmit={handleSubmitReview}>
            <label>Puntuación:</label>
            <select value={rating} onChange={e => setRating(e.target.value)}>
              {[1,2,3,4,5].map(n => <option key={n} value={n}>{n} ⭐</option>)}
            </select>

            <label>Comentario:</label>
            <textarea
              value={comment}
              onChange={e => setComment(e.target.value)}
              placeholder="Escribe tu opinión..."
              required
            />

            <button type="submit">Enviar review</button>
          </form>
        </div>

        <div className="review-list">
          <h3>Opiniones</h3>
          {reviews.length === 0 ? (
            <p>No hay opiniones aún</p>
          ) : (
            reviews.map((rev, idx) => (
              <div key={idx} className="review-item">
                <p>⭐ {rev.rating}</p>
                <p>{rev.comment}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
    </>
  );
}

export default DishDetail;