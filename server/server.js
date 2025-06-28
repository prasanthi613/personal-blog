// Load environment variables
require('dotenv').config();

// Import dependencies
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json());

// Load Supabase credentials from .env
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// Basic test route
app.get('/', (req, res) => {
  res.send('Blog backend is working with Supabase!');
});

// =======================
// BLOG POST ROUTES
// =======================

// Get all blog posts
app.get('/posts', async (req, res) => {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.json(data);
});

// Create a new blog post
app.post('/posts', async (req, res) => {
  const { title, content, author } = req.body;

  // ✅ Debug log to see what frontend is sending
  console.log("Received from frontend:", { title, content, author });

  const { data, error } = await supabase
    .from('posts')
    .insert([{ title, content, author }]);

  if (error) {
    console.log("❌ Error posting to Supabase:", error.message);
    return res.status(500).json({ error: error.message });
  }

  console.log("✅ Post saved successfully!");
  res.status(201).json(data);
});

// Delete a blog post by ID
app.delete('/posts/:id', async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', id);

  if (error) {
    console.error("❌ Error deleting post:", error.message);
    return res.status(500).json({ error: error.message });
  }

  res.status(200).json({ message: 'Post deleted successfully' });
});


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
