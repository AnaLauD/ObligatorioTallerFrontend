import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../features/auth/AuthenticationContext";
import { getLocales } from "../api/LocalsApi";
import { getDishes } from "../api/DishesApi";
import Header from "../components/Header";
import "./css/Profile.css";

function Profile() {

  const { user, token } = useAuth();
  const { id } = useParams();

  const [locals, setLocals] = useState([]);
  const [dishes, setDishes] = useState([]);

  const userId = id ? Number(id) : user?.id;    

  useEffect(() => {

    const loadData = async () => {

      try {

        const localsData = await getLocales(token);
        const dishesData = await getDishes(token);

        const filteredLocals = localsData.filter(
        local => local.creatorId === userId);

        const filteredDishes = dishesData.filter(
        dish => dish.creatorId === userId
    );
        

        setLocals(filteredLocals);
        setDishes(filteredDishes);

      } catch (error) {
        console.error(error);
      }

    };

    if (token && userId) {
      loadData();
    }

  }, [token, userId]);

  return (
    <div className="profile-page">

      <h1>{id ? "Perfil de usuario" : user?.name}</h1>

      <section className="profile-section">

        <h2>Locales creados</h2>

        <div className="locals-list">
          {locals.map((local) => (
            <div key={local.id} className="card">
              <h3>{local.name}</h3>
              <img
                src={local.photos?.[0] || "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/08/46/38/cb/de-tarde.jpg?w=900&h=500&s=1"}
                alt={local.name}
                className="local-image"
                />
              <p>{local.city}</p>
            </div>
          ))}
        </div>

      </section>

      <section className="profile-section">

        <h2>Platos creados</h2>

        <div className="dishes-list">
          {dishes.map((dish) => (
            <div key={dish.id} className="card">
              <h3>{dish.name}</h3>
              <p>${dish.price}</p>
            </div>
          ))}
        </div>

      </section>

    </div>
  );
}

export default Profile;