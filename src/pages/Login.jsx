import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/api/login`, {
        email,
        password,
      });

      if (response.data.token) {
        localStorage.setItem("authToken", response.data.token);
        setToken(response.data.token);
        toast.success("Login successful!");

        navigate("/users");
      } else {
        toast.error("Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Failed to login. Please try again.");
    }
  };

  return (
    <section className="login">
      <div className="wrapper card">
        <form style={{ padding: "10px" }} onSubmit={handleLogin}>
          <h2 style={{ fontSize: "36px" }}>Login</h2>
          <div className="input-box">
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-box">
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <input
            type="submit"
            className="submit"
            value="Login"
            style={{ fontWeight: "bold" }}
          />
          <div style={{ margin: "30px 0px", textAlign: "left" }}>
            <p>
              New to App?
              <Link
                to="/login"
                style={{ textDecoration: "none", marginLeft: "5px" }}
              >
                Sign up now
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
