// Require necessary package
const mongoose = require('mongoose');

// Define schema
const songSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  artist: {
    type: String,
    required: true
  },
  album: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  coverArt: {
    type: String,
    required: true
  },
  audioFile: {
    type: String,
    required: true
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Create model from schema
const Song = mongoose.model('Song', songSchema);

// Export model
module.exports = Song;

//to connect to the MongoDB instance and export the Song model
// Require necessary packages
const mongoose = require('mongoose');

// Connect to MongoDB instance
mongoose.connect('mongodb+srv://jayasrijerrygill:<password>@cluster0.mk1xn3c.mongodb.net/test', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error(error));

// Export models
module.exports = {
  Song: require('./song')
};

//use Mongoose queries to read from and write to the database in your controllers. Here's an example of how to create a new Song document in the database
// Require necessary packages and models
const express = require('express');
const Song = require('../models/song');

// Define controller function
async function createSong(req, res) {
  try {
    // Create new song document from request body
    const song = new Song(req.body);

    // Save song to database
    await song.save();

    // Respond with success message and song data
    res.json({ message: 'Song created', song });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

// Export controller function
module.exports = { createSong };

