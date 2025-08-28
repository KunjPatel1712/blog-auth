import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateBlog = () => {
  const [form, setForm] = useState({ title: '', author: '', content: '', tags: '' });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:3030/api/blog/createpost',
        {
          ...form,
          tags: form.tags.split(',').map(tag => tag.trim()),
        },
        {
          withCredentials: true,
        }
      );
      navigate('/');
    } catch (error) {
      console.error(error.message);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div style={{ padding: '3rem 1rem', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <div
        style={{
          maxWidth: '700px',
          margin: '0 auto',
          backgroundColor: '#ffffff',
          borderRadius: '1rem',
          boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.15)',
          padding: '2.5rem',
        }}
      >
        <h2
          style={{
            marginBottom: '2rem',
            textAlign: 'center',
            fontWeight: 'bold',
            color: '#0d6efd',
          }}
        >
          📝 Create a New Blog
        </h2>

        <form onSubmit={handleSubmit} noValidate>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ fontWeight: '600', display: 'block', marginBottom: '0.5rem' }}>
              Title
            </label>
            <input
              name="title"
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '0.5rem',
                border: '1px solid #ced4da',
              }}
              placeholder="Enter blog title"
              onChange={handleChange}
              required
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ fontWeight: '600', display: 'block', marginBottom: '0.5rem' }}>
              Author
            </label>
            <input
              name="author"
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '0.5rem',
                border: '1px solid #ced4da',
              }}
              placeholder="Author name"
              onChange={handleChange}
              required
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ fontWeight: '600', display: 'block', marginBottom: '0.5rem' }}>
              Content
            </label>
            <textarea
              name="content"
              rows="6"
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '0.5rem',
                border: '1px solid #ced4da',
              }}
              placeholder="Write your blog content..."
              onChange={handleChange}
              required
            />
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{ fontWeight: '600', display: 'block', marginBottom: '0.5rem' }}>
              Tags
            </label>
            <input
              name="tags"
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '0.5rem',
                border: '1px solid #ced4da',
              }}
              placeholder="e.g. React, JavaScript, Web Development"
              onChange={handleChange}
            />
            <div style={{ fontSize: '0.875rem', color: '#6c757d', marginTop: '0.25rem' }}>
              Separate tags with commas (,)
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <button
              type="submit"
              style={{
                backgroundColor: 'white',
                color: '#0d6efd',
                border: '2px solid #0d6efd',
                borderRadius: '999px',
                padding: '0.5rem 2rem',
                fontWeight: '600',
                boxShadow: '0 0.25rem 0.5rem rgba(0,0,0,0.1)',
                cursor: 'pointer',
              }}
            >
              🚀 Publish Blog
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
