const youtubeService = require('../services/youtubeService');

async function getSearchPage(req, res) {
    // In the future, we will also fetch favorites here
    res.render('search', {
        videos: [],
        searchQuery: '',
        user: req.session.user
    });
}

async function search(req, res) {
    const query = req.body.searchQuery;

    if (!query) {
        return res.redirect('/search');
    }

    try {
        const videos = await youtubeService.searchVideos(query);

        res.render('search', {
            videos: videos,
            searchQuery: query,
            user: req.session.user
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error performing search");
    }
}

module.exports = { getSearchPage, search };