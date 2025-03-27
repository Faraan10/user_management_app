import react from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import EditUsers from "./pages/EditUsers";
import UsersList from "./pages/UsersList";
import Direct from "./routes/Routes";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const App = () => {
  // console.log(BASE_URL);

  return (
    <>
      <h1>App file</h1>
      <BrowserRouter>
        <Direct />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/edit" element={<EditUsers />} />
          <Route path="/list" element={<UsersList />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
