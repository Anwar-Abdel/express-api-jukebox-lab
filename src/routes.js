const express = require('express');
const Track = require('./models');
const router = express.Router();

// Create a new track
router.post('/', async (req, res) => {
  try {
    const { title, artist } = req.body;
    const newTrack = new Track({ title, artist });
    await newTrack.save();
    res.status(201).json(newTrack);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all tracks
router.get('/', async (req, res) => {
  try {
    const tracks = await Track.find();
    res.status(200).json(tracks);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a single track by ID
router.get('/:id', async (req, res) => {
  try {
    const track = await Track.findById(req.params.id);
    if (!track) {
      return res.status(404).json({ error: 'Track not found' });
    }
    res.status(200).json(track);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a track by ID
router.put('/:id', async (req, res) => {
  try {
    const { title, artist } = req.body;
    const updatedTrack = await Track.findByIdAndUpdate(req.params.id, { title, artist }, { new: true });
    if (!updatedTrack) {
      return res.status(404).json({ error: 'Track not found' });
    }
    res.status(200).json(updatedTrack);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a track by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedTrack = await Track.findByIdAndDelete(req.params.id);
    if (!deletedTrack) {
      return res.status(404).json({ error: 'Track not found' });
    }
    res.status(200).json(deletedTrack);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
