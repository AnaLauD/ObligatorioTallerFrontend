import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../features/auth/Login";
import Register from "../features/auth/Register";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import CreateDish from "../pages/CreateDishes";
import CreateLocal from "../pages/CreateLocals";
import UserProfile from "../pages/UserProfile";
import PrivateRoute from "./PrivateRouter";
import LocalDetail from "../pages/LocalDetail";
import DishDetail from "../pages/DishDetail";

function AppRouter() {
  return (
    <Routes>

      <Route path="/" element={<Navigate to="/login" />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />

        <Route
          path="/user/:id"
          element={
            <PrivateRoute>
              <UserProfile />
            </PrivateRoute>
          }
        />

      <Route
        path="/local/:id"
        element={
          <PrivateRoute>
            <LocalDetail />
          </PrivateRoute>
        }
      />

      <Route
        path="/dish/:id"
        element={
          <PrivateRoute>
            <DishDetail />
          </PrivateRoute>
        }
      />

      <Route
        path="/create-local"
        element={
          <PrivateRoute>
            <CreateLocal />
          </PrivateRoute>
        }
      />

      <Route
        path="/create-dish"
        element={
          <PrivateRoute>
            <CreateDish />
          </PrivateRoute>
        }
      />

    </Routes>
  );
}

export default AppRouter;