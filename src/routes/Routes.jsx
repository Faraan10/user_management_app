import { Link } from "react-router-dom";

const Routes = () => {
  return (
    <>
      <h1>Routes Page</h1>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Link to="/login">Login</Link>
        <Link to="/edit">Edit</Link>
        <Link to="/list">Lists</Link>
      </div>
    </>
  );
};

export default Routes;
