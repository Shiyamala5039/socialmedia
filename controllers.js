// Require necessary packages and models
const express = require('express');
const Song = require('../models/song');

// Define controller function
async function getAllSongs(req, res) {
  try {
    // Find all songs in the database
    const songs = await Song.find();

    // Respond with songs data
    res.json({ songs });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

// Export controller function
module.exports = { getAllSongs };
