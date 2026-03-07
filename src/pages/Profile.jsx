import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../features/auth/AuthenticationContext";
import { getLocales } from "../api/LocalsApi";
import { getDishes } from "../api/DishesApi";
import LocalCard from "../components/LocalCard";
import DishCard from "../components/DishCard";
import Header from "../components/Header";
import "./css/Profile.css";

function Profile() {

  const { user, token, logout } = useAuth();
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
    <>   
    
     <Header activeTab={null} setActiveTab={null} user={user} logout={logout} />
    <div className="profile-page">

      <h1>{id ? "Perfil de usuario" : user?.name}</h1>

      <section className="profile-section">

        <h2>Locales creados</h2>

        <div className="locals-list">
          {locals.map((local) => (
            <LocalCard key={local.id} local={local} />
          ))}
        </div>

      </section>

      <section className="profile-section">

        <h2>Platos creados</h2>

        <div className="dishes-list">
          {dishes.map((dish) => (
            <DishCard key={dish.id} dish={dish} />
          ))}
        </div>

      </section>

    </div>
    </>
  );
}

export default Profile;