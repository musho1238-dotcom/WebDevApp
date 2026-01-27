exports.addFavorite = (req, res) => {
    const { videoId, title, thumbnailUrl } = req.body;
    const userId = req.session.userId;

    if (!userId) {
        return res.redirect('/login');
    }

    // שלב 1: בדיקה האם הסרטון כבר קיים
    const checkQuery = "SELECT id FROM Favorites WHERE userId = ? AND videoId = ?";

    db.get(checkQuery, [userId, videoId], (err, row) => {
        if (err) {
            console.error("Error checking favorite:", err.message);
            return res.redirect('/search');
        }

        // אם נמצאה שורה (row קיים), סימן שהסרטון כבר במועדפים
        if (row) {
            console.log("Video already in favorites, skipping insert.");
            return res.redirect('/search');
        }

        // שלב 2: אם לא נמצא (else), מבצעים את ההוספה
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