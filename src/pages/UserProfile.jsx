import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getLocales } from "../api/LocalsApi";
import { getDishes } from "../api/DishesApi";
import { getUserById } from "../api/UsersApi";
import Header from "../components/Header";
import "./css/Profile.css";

function UserProfile() {

  const { id } = useParams();
  console.log("ID de usuario en UserProfile:", id);
  const token = localStorage.getItem("token");

  const [user, setUser] = useState(null);
  const [locals, setLocals] = useState([]);
  const [dishes, setDishes] = useState([]);

  useEffect(() => {

    const loadData = async () => {

      try {

        const userData = await getUserById(id, token);
        const localsData = await getLocales(token);
        const dishesData = await getDishes(token);

        const filteredLocals = localsData.filter(
        local => local.creatorId === Number(id)
    );

        const filteredDishes = dishesData.filter(
        dish => dish.creatorId === Number(id)
    );

        setUser(userData);
        setLocals(filteredLocals);
        setDishes(filteredDishes);

      } catch (error) {
        console.error(error);
      }

    };

    if (id) {
      loadData();
    }

  }, [id]);

  return (
    <div className="profile-page">

      <h1>{user?.name}</h1>

      <section className="profile-section">

        <h2>Locales creados</h2>

        <div className="locals-list">
          {locals.map(local => (
            <div key={local.id} className="card">
              <h3>{local.name}</h3>
              <img
                src={local.photos[0]}
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
          {dishes.map(dish => (
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

export default UserProfile;