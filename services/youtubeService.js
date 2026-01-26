const axios = require('axios');

const API_KEY = process.env.YOUTUBE_API_KEY;
const BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

async function searchVideos(query) {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                part: 'snippet',
                q: query,
                key: API_KEY,
                type: 'video',
                maxResults: 10
            }
        });

        // Returns an array of video objects
        return response.data.items;
    } catch (error) {
        console.error('Error fetching data from YouTube API:', error.message);
        throw error;
    }
}

module.exports = { searchVideos };