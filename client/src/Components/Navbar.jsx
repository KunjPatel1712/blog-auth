import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Navbar.css"

const BASE_URL = "http://localhost:3030"; // Change to your backend URL

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get(`${BASE_URL}/api/user/logout`, {
        withCredentials: true, // sends cookie with request
      });

      localStorage.removeItem("user");
      setUser(null);
      alert("Logged out successfully!");
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);
      alert("Failed to log out.");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark custom-navbar shadow-sm">
      <div className="container">
        <Link to="/" className="navbar-brand brand-highlight">
          Blog
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center gap-3">
            <li className="nav-item">
              <Link to="/" className="nav-link nav-link-style">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/createpost" className="nav-link nav-link-style">
                Create Blog
              </Link>
            </li>

            {user ? (
              <>
                <li className="nav-item text-white d-flex align-items-center">
                  <span className="me-2">
                    Welcome <strong>{user.name}</strong>
                  </span>
                </li>
                <li className="nav-item">
                  <button
                    onClick={handleLogout}
                    className="btn btn-outline-light btn-sm ml-2"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link to="/login" className="nav-link nav-link-style">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
