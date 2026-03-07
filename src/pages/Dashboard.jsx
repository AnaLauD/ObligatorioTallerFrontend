import { useState } from "react";
import { useAuth } from "../features/auth/AuthenticationContext";
import Locales from "./Locales";
import CreateLocal from "./CreateLocals";
import CreateDish from "./CreateDishes";
import Header from "../components/Header";
import Dishes from "./Dishes";
import "./css/Dashboard.css";

function Dashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("locales");

  return (
    <div className="dashboard">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} user={user} logout={logout} />

      
      <div className="dashboard-tabs">
        <button
          className={activeTab === "locales" ? "active" : ""}
          onClick={() => setActiveTab("locales")}
        >
          Locales
        </button>

        <button
          className={activeTab === "dishes" ? "active" : ""}
          onClick={() => setActiveTab("dishes")}
        >
          Platos
        </button>
        </div>



      <main className="dashboard-content">
        {activeTab === "locales" && <Locales />}
        {activeTab === "dishes" && <Dishes />}
        {activeTab === "createLocal" && <CreateLocal />}
        {activeTab === "createDish" && <CreateDish />}
      </main>

      
    </div>
  );
}

export default Dashboard;