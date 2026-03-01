import { useNavigate } from "react-router-dom";
import "./LocalCard.css";


function LocalCard({ local, onVerDetalle }) {

    const navigate = useNavigate();


  return (

    console.log("Renderizando LocalCard para:", local),

    <div className="local-card">
      <img
        src={local.photos?.[0] ? local.photos[0] : "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/08/46/38/cb/de-tarde.jpg?w=900&h=500&s=1"}
        alt={`Imagen de ${local.nombre}`}
        className="local-card__img"
      />

      <p className="local-card__descripcion">
        {local.name}
      </p>

      <button
        className="local-card__btn"
        onClick={() => navigate(`/local/${local.id}`)}
      >
        Ver detalle
      </button>
    </div>
  );
}

export default LocalCard;
