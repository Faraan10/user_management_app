import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaSignInAlt, FaUser } from "react-icons/fa";
import { Avatar, IconButton, Menu } from "@mui/material";
import { blue } from "@mui/material/colors";
// import { toast } from "react-toastify";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  // const userData = { name: "Faraan", email: "faraan@gmail.com" };
  const userData = null;
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const remove = () => {};

  // const remove = () => {
  //   dispatch(removeUser());
  //   navigate("/login");
  //   toast.success("Logged out Successfully");
  //   handleClose();
  // };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body" data-bs-theme="dark">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand" style={{ fontSize: "32px" }}>
            User Management App
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav d-flex justify-content-end align-items-center gap-3 w-100">
              {userData !== null ? (
                <li
                  className="nav-item dropstart"
                  style={{ marginRight: "10px", fontSize: "18px" }}
                >
                  <IconButton
                    aria-controls="profile-dropdown"
                    aria-haspopup="true"
                    onClick={handleClick}
                  >
                    <Avatar
                      sx={{ bgcolor: blue[700], height: "35px", width: "35px" }}
                      src=""
                    />
                  </IconButton>
                  <Menu
                    id="profile-dropdown"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <div
                      style={{
                        padding: "10px 20px",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <h5>{userData && userData.name}</h5>
                      <p>{userData && userData.email}</p>
                      <button onClick={remove} className="logout">
                        Logout
                      </button>
                    </div>
                  </Menu>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <Link
                      to="/login"
                      className="nav-link active"
                      aria-current="page"
                    >
                      <FaSignInAlt style={{ marginRight: "5px" }} />
                      Log In
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
