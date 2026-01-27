const db = require('../config/db');

exports.addFavorite = (req, res) => {
    const { videoId, title, thumbnailUrl } = req.body;
    const userId = req.session.userId;

    if (!userId) {
        return res.redirect('/login');
    }

    const query = `
        INSERT INTO Favorites (userId, videoId, title, thumbnailUrl)
        VALUES (?, ?, ?, ?)
    `;

    db.run(query, [userId, videoId, title, thumbnailUrl], function (err) {
        if (err) {
            console.error("Error adding favorite:", err.message);
        }
        // Refresh the page to show the new favorite
        res.redirect('/search');
    });
};

exports.removeFavorite = (req, res) => {
    const { id } = req.body;
    const userId = req.session.userId;

    const query = `DELETE FROM Favorites WHERE id = ? AND userId = ?`;

    db.run(query, [id, userId], function (err) {
        if (err) {
            console.error("Error removing favorite:", err.message);
        }
        res.redirect('/search');
    });
};