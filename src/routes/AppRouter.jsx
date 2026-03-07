import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../features/auth/Login";
import Register from "../features/auth/Register";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import UserProfile from "../pages/UserProfile";
import PrivateRoute from "./PrivateRouter";
import LocalDetail from "../pages/LocalDetail";

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

    </Routes>
  );
}

export default AppRouter;