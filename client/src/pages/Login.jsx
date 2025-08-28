import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3030/api/user/login", formData, {
        withCredentials: true,
      });

      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.token);

      alert(res.data.message);
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div
        className="shadow-lg rounded-4 p-5 w-100"
        style={{
          maxWidth: "400px",
          backgroundColor: "#ffffff",
        }}
      >
        <h3 className="text-center mb-4 fw-bold text-primary">🔐 Login</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Email address</label>
            <input
              name="email"
              type="email"
              className="form-control"
              placeholder="Enter email"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold">Password</label>
            <input
              name="password"
              type="password"
              className="form-control"
              placeholder="Enter password"
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-outline-primary w-100 fw-semibold rounded-pill"
          >
            🔓 Login
          </button>
        </form>

        <p className="mt-3 text-center">
          Don't have an account?{' '}
          <Link to="/register" className="text-decoration-none fw-bold text-primary">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
