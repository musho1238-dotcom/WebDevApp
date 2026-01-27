const express = require('express');
const router = express.Router();
const favoritesController = require('../controllers/favoritesController');

// Route to add a video
router.post('/add', favoritesController.addFavorite);

// Route to remove a video
router.post('/remove', favoritesController.removeFavorite);

module.exports = router;