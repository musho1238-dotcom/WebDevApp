const db = require('../config/db');

exports.addFavorite = (req, res) => {
    const { videoId, title, thumbnailUrl } = req.body;
    const userId = req.session.userId;

    if (!userId) {
        return res.redirect('/login');
    }

    const checkQuery = "SELECT id FROM Favorites WHERE userId = ? AND videoId = ?";

    db.get(checkQuery, [userId, videoId], (err, row) => {
        if (err) {
            console.error("Error checking favorite:", err.message);
            return res.redirect('/search');
        }

        if (row) {
            console.log("Video already in favorites, skipping insert.");
            return res.redirect('/search');
        }

        const insertQuery = `
            INSERT INTO Favorites (userId, videoId, title, thumbnailUrl)
            VALUES (?, ?, ?, ?)
        `;

        db.run(insertQuery, [userId, videoId, title, thumbnailUrl], function (err) {
            if (err) {
                console.error("Error adding favorite:", err.message);
            }
            res.redirect('/search');
        });
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