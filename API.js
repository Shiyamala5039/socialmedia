// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('./models/User');
const Playlist = require('./models/Playlist');
const Track = require('./models/Track');

// Create an instance of Express
const app = express();

// Configure middleware
app.use(bodyParser.json());

// Define routes
// Authentication API
app.post('/api/authenticate', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: 'Authentication failed. User not found.' });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Authentication failed. Wrong password.' });
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token });
});

// User API
app.get('/api/users', async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

app.post('/api/users', async (req, res) => {
  const { username, email, password } = req.body;
  const user = new User({ username, email, password });
  await user.save();
  res.json(user);
});

// Playlist API
app.get('/api/playlists', async (req, res) => {
  const playlists = await Playlist.find({}).populate('tracks');
  res.json(playlists);
});

app.post('/api/playlists', async (req, res) => {
  const { name, userId } = req.body;
  const playlist = new Playlist({ name, userId });
  await playlist.save();
  res.json(playlist);
});

// Track API
app.get('/api/tracks', async (req, res) => {
  const tracks = await Track.find({});
  res.json(tracks);
});

app.post('/api/tracks', async (req, res) => {
  const { title, artist, album, duration } = req.body;
  const track = new Track({ title, artist, album, duration });
  await track.save();
  res.json(track);
});

// Authenticate requests
app.use((req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Authentication failed. No token provided.' });
  }
  const token = authHeader.split(' ')[1];
  jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (error) {
      return res.status(401).json({ message: 'Authentication failed. Invalid token.' });
    }
    req.userId = decoded.id;
    next();
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server started at http://localhost:3000');
});
