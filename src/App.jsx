import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./pages/Login";
import EditUsers from "./pages/EditUsers";
import UsersList from "./pages/UsersList";
import Navbar from "./routes/Navbar";
import "./App.css";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("authToken"));

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
        <Route
          path="/edit/:id"
          element={token ? <EditUsers /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/users"
          element={token ? <UsersList /> : <Navigate to="/login" replace />}
        />
        <Route
          path="*"
          element={
            token ? (
              <Navigate to="/users" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
