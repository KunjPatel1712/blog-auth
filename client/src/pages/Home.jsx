import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card, Button, Spinner } from "react-bootstrap";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get("http://localhost:3030/api/blog/all", {
        withCredentials: true,
      });
      setBlogs(res.data.blogs || []);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch blogs", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="container py-5">
      <h2 className="text-center mb-5 fw-bold">📚 Latest Blogs</h2>

      {loading ? (
        <div className="d-flex justify-content-center py-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : blogs.length === 0 ? (
        <h4 className="text-center text-muted">No blogs found.</h4>
      ) : (
        <div className="row g-4">
          {blogs.map((blog) => (
            <div className="col-md-6 col-lg-4" key={blog._id}>
              <Card className="h-100 shadow-sm rounded-4">
                <Card.Img
                  variant="top"
                  src="https://images.unsplash.com/photo-1601758174649-6689a2f0f082?auto=format&q=80&w=1200"
                  style={{ height: "200px", objectFit: "cover" }}
                  alt="Blog thumbnail"
                />
                <Card.Body>
                  <Card.Title className="fw-bold">{blog.title}</Card.Title>
                  <Card.Text className="text-muted mb-2 small">
                    ✍️ {blog.author} | 📅{" "}
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </Card.Text>
                  <Card.Text>
                    {blog.content.slice(0, 100)}...
                  </Card.Text>
                  <Link to={`/blog/${blog._id}`} className="btn btn-dark btn-sm mt-2">
                    Read More →
                  </Link>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
