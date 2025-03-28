import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import EditUsers from "./pages/EditUsers";
import UsersList from "./pages/UsersList";
import Direct from "./routes/Routes";
const BASE_URL = import.meta.env.VITE_BASE_URL;
import "./App.css";

const App = () => {
  console.log(BASE_URL);

  const token = "49494949";

  return (
    <>
      <h1>App file</h1>
      <BrowserRouter>
        <Direct />
        <Routes>
          <Route
            path="/"
            element={
              token ? <Navigate to="/users" /> : <Navigate to="/login" />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/edit/:id"
            element={token ? <EditUsers /> : <Navigate to="/login" />}
          />
          <Route
            path="/users"
            element={token ? <UsersList /> : <Navigate to="/login" />}
          />
          <Route
            path="*"
            element={
              token ? <Navigate to="/users" /> : <Navigate to="/login" />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
