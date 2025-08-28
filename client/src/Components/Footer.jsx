import React from 'react';

const Footer = () => {
  return (
    <footer
      className="bg-dark text-white py-4 mt-5"
      style={{ borderTop: "2px solid #28a745" }}
    >
      <div className="container text-center">
        <h5 className="mb-2 fw-bold text-success">📝 BlogSpace</h5>
        <p className="mb-3 fst-italic">Write. Share. Inspire.</p>

        <div className="d-flex justify-content-center gap-4 mb-3">
          <a href="/" className="text-light text-decoration-none fw-semibold">
            Home
          </a>
          <a href="/create" className="text-light text-decoration-none fw-semibold">
            Create Blog
          </a>
        </div>

        <small className="text-light opacity-75">
          &copy; 2025 BlogSpace. All rights reserved.
        </small>
      </div>
    </footer>
  );
};

export default Footer;
