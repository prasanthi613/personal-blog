import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: ''
  });

  // Fetch posts
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    axios.get('http://localhost:5000/posts')
      .then(res => setPosts(res.data))
      .catch(err => console.error('Error fetching posts:', err));
  };

  // Handle form field changes
  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Submit new post
  const handleSubmit = e => {
    e.preventDefault();

    axios.post('http://localhost:5000/posts', formData)
      .then(() => {
        setFormData({ title: '', content: '', author: '' });
        fetchPosts(); // Refresh post list
      })
      .catch(err => console.error('Error creating post:', err));
  };

  const handleDelete = (id) => {
  axios.delete(`http://localhost:5000/posts/${id}`)
    .then(() => fetchPosts()) // Refresh the list
    .catch(err => console.error("Error deleting post:", err));
};


  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1 style={{ marginBottom: '2rem' }}>📝 My Personal Blog</h1>

      {/* Blog Post Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
          style={{ display: 'block', marginBottom: '1rem', width: '100%', padding: '0.5rem' }}
        />
        <textarea
          name="content"
          placeholder="Content"
          value={formData.content}
          onChange={handleChange}
          required
          rows={4}
          style={{ display: 'block', marginBottom: '1rem', width: '100%', padding: '0.5rem' }}
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={formData.author}
          onChange={handleChange}
          required
          style={{ display: 'block', marginBottom: '1rem', width: '100%', padding: '0.5rem' }}
        />
        <button type="submit" style={{ padding: '0.5rem 1rem' }}>Post</button>
      </form>

      {/* Blog Post List */}
      {posts.length === 0 ? (
        <p>No blog posts yet.</p>
      ) : (
        posts.map(post => (
          <div key={post.id} style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '6px', marginBottom: '1rem' }}>
            <h2>{post.title}</h2>
            <p><strong>By:</strong> {post.author}</p>
            <p>{post.content}</p>
            <p style={{ fontSize: '0.8rem', color: '#666' }}>{new Date(post.created_at).toLocaleString()}</p>
            <button
  onClick={() => handleDelete(post.id)}
  style={{
    marginTop: '0.5rem',
    color: 'white',
    backgroundColor: 'red',
    border: 'none',
    padding: '0.3rem 0.7rem',
    borderRadius: '4px',
    cursor: 'pointer'
  }}
>
  Delete
</button>

          </div>
        ))
      )}
    </div>
  );
}

export default App;
