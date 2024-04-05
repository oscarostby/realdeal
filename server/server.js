// Installer disse pakkene først:
// npm install express mongoose bcrypt cors

const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB tilkobling
// MongoDB tilkobling
mongoose.connect('mongodb://10.12.11.193:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('MongoDB KOBLA TILL');
});

// Definisjon av brukermodell
const User = mongoose.model('User', new mongoose.Schema({
  username: String,
  password: String
}));

// Registreringsrute
app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration failed:', error.message);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Påloggingsrute
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

// API-rute for å hente alle brukerne
app.get('/users', async (req, res) => {
    try {
      const users = await User.find({}, 'username');
      res.status(200).json(users);
    } catch (error) {
      console.error('Failed to fetch users:', error.message);
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  });
  
// Start serveren
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
