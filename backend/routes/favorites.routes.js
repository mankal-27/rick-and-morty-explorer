// backend/routes/favorites.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

const User = require('../models/User.model');

// Utility function to handle adding favorites
const addFavorite = async (userId, type, id) => {
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');

  if (!user.favorites[type].includes(id)) {
    user.favorites[type].push(id);
    await user.save();
  }

  return user.favorites[type];
};

// Utility function to handle removing favorites
const removeFavorite = async (userId, type, id) => {
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');

  user.favorites[type] = user.favorites[type].filter(favId => favId !== id);
  await user.save();

  return user.favorites[type];
};

//////////////////////////////
// Characters Favorites
//////////////////////////////

// POST /api/favorites/characters/:id
router.post('/characters/:id', authMiddleware, async (req, res) => {
  const characterId = parseInt(req.params.id);
  const userId = req.user;

  try {
    const favorites = await addFavorite(userId, 'characters', characterId);
    res.json({ message: 'Character added to favorites', favorites });
  } catch (error) {
    console.error('Add Favorite Character Error:', error.message);
    res.status(500).json({ message: 'Server error adding favorite character' });
  }
});

// DELETE /api/favorites/characters/:id
router.delete('/characters/:id', authMiddleware, async (req, res) => {
  const characterId = parseInt(req.params.id);
  const userId = req.user;

  try {
    const favorites = await removeFavorite(userId, 'characters', characterId);
    res.json({ message: 'Character removed from favorites', favorites });
  } catch (error) {
    console.error('Remove Favorite Character Error:', error.message);
    res.status(500).json({ message: 'Server error removing favorite character' });
  }
});

//////////////////////////////
// Episodes Favorites
//////////////////////////////

// POST /api/favorites/episodes/:id
router.post('/episodes/:id', authMiddleware, async (req, res) => {
  const episodeId = parseInt(req.params.id);
  const userId = req.user;

  try {
    const favorites = await addFavorite(userId, 'episodes', episodeId);
    res.json({ message: 'Episode added to favorites', favorites });
  } catch (error) {
    console.error('Add Favorite Episode Error:', error.message);
    res.status(500).json({ message: 'Server error adding favorite episode' });
  }
});

// DELETE /api/favorites/episodes/:id
router.delete('/episodes/:id', authMiddleware, async (req, res) => {
  const episodeId = parseInt(req.params.id);
  const userId = req.user;

  try {
    const favorites = await removeFavorite(userId, 'episodes', episodeId);
    res.json({ message: 'Episode removed from favorites', favorites });
  } catch (error) {
    console.error('Remove Favorite Episode Error:', error.message);
    res.status(500).json({ message: 'Server error removing favorite episode' });
  }
});

//////////////////////////////
// Locations Favorites
//////////////////////////////

// POST /api/favorites/locations/:id
router.post('/locations/:id', authMiddleware, async (req, res) => {
  const locationId = parseInt(req.params.id);
  const userId = req.user;

  try {
    const favorites = await addFavorite(userId, 'locations', locationId);
    res.json({ message: 'Location added to favorites', favorites });
  } catch (error) {
    console.error('Add Favorite Location Error:', error.message);
    res.status(500).json({ message: 'Server error adding favorite location' });
  }
});

// DELETE /api/favorites/locations/:id
router.delete('/locations/:id', authMiddleware, async (req, res) => {
  const locationId = parseInt(req.params.id);
  const userId = req.user;

  try {
    const favorites = await removeFavorite(userId, 'locations', locationId);
    res.json({ message: 'Location removed from favorites', favorites });
  } catch (error) {
    console.error('Remove Favorite Location Error:', error.message);
    res.status(500).json({ message: 'Server error removing favorite location' });
  }
});

module.exports = router;
