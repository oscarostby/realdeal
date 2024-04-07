const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://10.12.11.193:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const User = mongoose.model('User', new mongoose.Schema({
  username: String,
  password: String
}));

const Post = mongoose.model('Post', new mongoose.Schema({
  title: String,
  content: String,
  author: String
}));

// API route to fetch all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find({}, 'username');
    res.status(200).json(users);
  } catch (error) {
    console.error('Failed to fetch users:', error.message);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// API route to delete a user by ID
app.delete('/users/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Failed to delete user:', error.message);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

// Registration route
app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }
    
    // If the username doesn't exist, proceed with user creation
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration failed:', error.message);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login route
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Login failed:', error.message);
    res.status(500).json({ error: 'Login failed' });
  }
});

// API route to create a new post
app.post('/posts', async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const newPost = new Post({ title, content, author });
    await newPost.save();
    res.status(201).json({ message: 'Post created successfully' });
  } catch (error) {
    console.error('Failed to create post:', error.message);
    res.status(500).json({ error: 'Failed to create post' });
  }
});

// API route to fetch all posts
app.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find({});
    res.status(200).json(posts);
  } catch (error) {
    console.error('Failed to fetch posts:', error.message);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// API route to delete a post by ID
app.delete('/posts/:postId', async (req, res) => {
  try {
    const { postId } = req.params;
    await Post.findByIdAndDelete(postId);
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Failed to delete post:', error.message);
    res.status(500).json({ error: 'Failed to delete post' });
  }
});

// API route to fetch posts by username
// API route to fetch posts by username
app.get('/posts/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const posts = await Post.find({ author: username });
    res.status(200).json(posts);
  } catch (error) {
    console.error('Failed to fetch posts:', error.message);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});



app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
