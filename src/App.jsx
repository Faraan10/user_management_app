import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import EditUsers from "./pages/EditUsers";
import UsersList from "./pages/UsersList";
import NotFound from "./pages/NotFound";
import Navbar from "./routes/Navbar";
import "./App.css";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("authToken"));
  console.log(token);

  useEffect(() => {
    setToken(localStorage.getItem("authToken"));
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            token ? (
              <Navigate to="/users" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route
          path="/edit/:id"
          element={token ? <EditUsers /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/users"
          element={token ? <UsersList /> : <Navigate to="/login" replace />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
