function DishCard({ dish }) {
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
      </div>
    </div>
  );
}

export default DishCard;