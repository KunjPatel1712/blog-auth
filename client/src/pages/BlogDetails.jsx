import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState({
    title: '',
    author: '',
    content: '',
    tags: [],
    createdAt: ''
  });

  useEffect(() => {
    axios
      .get(`http://localhost:3030/api/blog/detail/${id}`, { withCredentials: true })
      .then((res) => setBlog(res.data.blog))
      .catch((err) => console.log(err));
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      const res = await axios.delete(`http://localhost:3030/api/blog/delete/${id}`, {
        withCredentials: true
      });
      alert(res.data.message);
      navigate("/");
    } catch (error) {
      alert("Error deleting blog");
    }
  };

  return (
    <div style={{ padding: '3rem 1rem' }}>
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <Card style={{
            border: 'none',
            borderRadius: '1rem',
            boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.15)',
            overflow: 'hidden'
          }}>
            <Card.Img
              variant="top"
              src="https://images.unsplash.com/photo-1432821596592-e2c18b78144f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmxvZyUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D"
              alt={blog.title}
              style={{
                objectFit: 'cover',
                height: '300px',
                width: '100%'
              }}
            />
            <Card.Body style={{ padding: '2rem' }}>
              <h1 style={{ fontWeight: '700', fontSize: '2.2rem', color: '#343a40', marginBottom: '1rem' }}>
                {blog.title}
              </h1>
              <div style={{
                fontSize: '0.9rem',
                color: '#6c757d',
                marginBottom: '1rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span>✍️ By <strong>{blog.author}</strong></span>
                <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
              </div>
              <hr />
              <p style={{
                fontSize: '1.1rem',
                lineHeight: '1.8',
                color: '#212529'
              }}>
                {blog.content}
              </p>

              {blog.tags.length > 0 && (
                <div style={{ marginTop: '1.5rem' }}>
                  {blog.tags.map((tag, index) => (
                    <span
                      key={index}
                      style={{
                        backgroundColor: '#0d6efd',
                        color: 'white',
                        fontSize: '0.8rem',
                        marginRight: '0.5rem',
                        marginBottom: '0.5rem',
                        padding: '0.3rem 0.6rem',
                        borderRadius: '0.5rem',
                        display: 'inline-block'
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              <div style={{
                marginTop: '2rem',
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '1rem'
              }}>
                <Link
                  to={`/edit/${blog._id}`}
                  className="btn btn-outline-dark rounded-pill px-4"
                >
                  ✏️ Edit
                </Link>
                <Button
                  variant="outline-danger"
                  className="rounded-pill px-4"
                  onClick={handleDelete}
                >
                  🗑️ Delete
                </Button>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
