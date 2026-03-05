import React, { use } from "react";
import { useState, useEffect } from "react";
import { getDishById } from "../api/DishesApi";

function DishCard({ dish }) {

  const [reviews, setReviews] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
  const fetchDish = async () => {
    try {
      const data = await getDishById(dish.id, token);
      setReviews(data.reviews || []);
      console.log("Reviews obtenidas:", data.reviews);
    } catch (err) {
      console.error(err);
    }
  };

  fetchDish();
}, [dish.id]);

  function getReviewStats(reviews) {

    if (!reviews || reviews.length === 0) {
      return {
        averageRating: 0,
        reviewCount: 0
      };
    }

    const total = reviews.reduce((sum, review) => sum + review.rating, 0);

    const averageRating = total / reviews.length;

    return {
      averageRating: Number(averageRating.toFixed(1)),
      reviewCount: reviews.length
    };
  }

  console.log("Renderizando DishCard para:", reviews);

  const { averageRating, reviewCount } = getReviewStats(reviews);

  return (
    <div className="dish-card">
      <div className="dish-header">
        <h3>{dish.name}</h3>
        <span className="dish-category">{dish.category}</span>
      </div>

      <p>{dish.description}</p>

      <div className="dish-price">
        ${dish.price}
      </div>

      <div className="dish-meta">
        <span>📍 {dish.city}</span>
        <span>🏠 {dish.local?.name}</span>
        <span>👤 {dish.creator?.name}</span>
        <p>⭐ {averageRating} ({reviewCount} reviews)</p>
      </div>
    </div>
  );
}

export default DishCard;