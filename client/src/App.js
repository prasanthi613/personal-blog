import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Make sure scroll-strip and angled-card are defined here

function App() {
  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState({ title: '', content: '', author: '' });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    axios.get('http://localhost:5000/posts')
      .then(res => setPosts(res.data))
      .catch(err => console.error('Error fetching posts:', err));
  };

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.post('http://localhost:5000/posts', formData)
      .then(() => {
        setFormData({ title: '', content: '', author: '' });
        fetchPosts();
      })
      .catch(err => console.error('Error creating post:', err));
  };

  const handleDelete = id => {
    axios.delete(`http://localhost:5000/posts/${id}`)
      .then(() => fetchPosts())
      .catch(err => console.error("Error deleting post:", err));
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isFiltered = searchTerm.trim() !== '';

  return (
    <div
      style={{
        backgroundImage: `url('/bg.png')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        minHeight: '100vh',
        paddingTop: '2rem',
        paddingBottom: '2rem'
      }}
    >
      <div className="container text-white">

        <h1 className="text-center mb-4" style={{ color: '#d9534f' }}>
  📝 My Personal Blog
</h1>

        {/* Search */}
        <div className="d-flex justify-content-center mb-4">
          <input
            type="text"
            placeholder="Search by title or author"
            className="form-control"
            style={{ maxWidth: '400px' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Form */}
        <div className="d-flex justify-content-center mb-5">
          <div className="card p-4 shadow" style={{ width: '400px', backgroundColor: 'white', borderRadius: '1rem' }}>
            <h4 className="mb-4 text-center text-dark">Create New Post</h4>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  placeholder="Title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <textarea
                  name="content"
                  className="form-control"
                  placeholder="Content"
                  rows="3"
                  value={formData.content}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  name="author"
                  className="form-control"
                  placeholder="Author"
                  value={formData.author}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-danger w-100">Post</button>
            </form>
          </div>
        </div>

        {/* Blog Cards */}
        <div className={isFiltered ? "row" : "scroll-strip"}>
          {filteredPosts.length === 0 ? (
            <p className="text-muted">No blog posts found.</p>
          ) : (
            filteredPosts.map(post => (
              <div
                key={post.id}
                className={isFiltered ? "col-md-4 mb-4" : "angled-card"}
              >
                <div className="p-3 text-white text-center h-100 d-flex flex-column justify-content-between" style={{ backgroundColor: '#d9534f', borderRadius: '10px' }}>
                  <div>
                    <h5>{post.title}</h5>
                    <p><strong>By:</strong> {post.author}</p>
                    <p>{post.content}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: '0.75rem', color: '#f0e5b1' }}>{new Date(post.created_at).toLocaleString()}</p>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="btn btn-sm btn-light mt-2"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
