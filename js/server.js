const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Create Express app
const app = express();
app.use(cors());
app.use(express.json());

// Replace with your actual MongoDB Atlas connection string
const uri = 'mongodb+srv://Abishan:Abishan%401@cluster0.oqav21p.mongodb.net/scienceclub?retryWrites=true&w=majority&appName=Cluster0';


mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Schema
const blogSchema = new mongoose.Schema({
  author: String,
  title: String,
  content: String
}, {
  timestamps: true
});
const Blog = mongoose.model('Blog', blogSchema);

// Routes
app.get('/blogs', async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 });
  res.json(blogs);
});

app.post('/blogs', async (req, res) => {
  const blog = new Blog(req.body);
  await blog.save();
  res.status(201).json(blog);
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
