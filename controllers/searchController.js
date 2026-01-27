const youtubeService = require('../services/youtubeService');
const db = require('../config/db'); // Import DB connection

// Helper function to fetch favorites (Promise wrapper for sqlite)
function getFavorites(userId) {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM Favorites WHERE userId = ?", [userId], (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}

async function getSearchPage(req, res) {
    try {
        // Fetch real favorites from DB
        const favorites = await getFavorites(req.session.userId);

        res.render('search', {
            videos: [],
            searchQuery: '',
            favorites: favorites, // Pass the data to the view
            user: req.session.user
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error loading page");
    }
}

async function search(req, res) {
    const query = req.body.searchQuery;

    try {
        // Run both requests in parallel: Search YouTube AND fetch favorites
        const [videos, favorites] = await Promise.all([
            youtubeService.searchVideos(query),
            getFavorites(req.session.userId)
        ]);

        res.render('search', {
            videos: videos,
            searchQuery: query,
            favorites: favorites, // Pass the data here too
            user: req.session.user
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error performing search");
    }
}

module.exports = { getSearchPage, search };