const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');

// Display the search page
router.get('/', searchController.getSearchPage);

// Handle the search form submission
router.post('/', searchController.search);

module.exports = router;