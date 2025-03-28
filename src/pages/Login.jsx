import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { toast } from "react-toastify";

const Login = () => {
  return (
    <>
      <section className="login">
        <div className="wrapper card">
          <form style={{ padding: "10px" }}>
            <h2 style={{ fontSize: "36px" }}>Login</h2>

            <div className="input-box">
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="input-box">
              <input
                type="password"
                className="form-control"
                placeholder="Enter your password"
                required
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
    </>
  );
};

export default Login;
