import "./LocalCard.css";


function LocalCard({ local, onVerDetalle }) {
  return (
    <div className="local-card">
      <img
        src={local.photos[0]}
        alt={`Imagen de ${local.nombre}`}
        className="local-card__img"
      />

      <p className="local-card__descripcion">
        {local.name}
      </p>

      <button
        className="local-card__btn"
        onClick={() => onVerDetalle(local.id)}
      >
        Ver detalle
      </button>
    </div>
  );
}

export default LocalCard;
