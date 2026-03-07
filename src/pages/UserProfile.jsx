import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../features/auth/AuthenticationContext";
import { getLocales } from "../api/LocalsApi";
import LocalCard from "../components/LocalCard";
import DishCard from "../components/DishCard";
import { getDishes } from "../api/DishesApi";
import { getUserById } from "../api/UsersApi";
import Header from "../components/Header";
import "./css/Profile.css";

function UserProfile() {

  const { user, logout } = useAuth();
  const { id } = useParams();
  console.log("ID de usuario en UserProfile:", id);
  const token = localStorage.getItem("token");

  const [currentUser, setcurrentUser] = useState(null);
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

        setcurrentUser(userData);
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
    <>   
    
     <Header activeTab={null} setActiveTab={null} user={user} logout={logout} />
    <div className="profile-page">

      <h1>{currentUser?.name}</h1>

      <section className="profile-section">

        <h2>Locales creados</h2>

        <div className="locals-list">
          {locals.map(local => (
            <LocalCard key={local.id} local={local} />
          ))}
        </div>

      </section>

      <section className="profile-section">

        <h2>Platos creados</h2>

        <div className="dishes-list">
          {dishes.map(dish => (
            <DishCard key={dish.id} dish={dish} />
          ))}
        </div>

      </section>

    </div>
    </>
  );
}

export default UserProfile;