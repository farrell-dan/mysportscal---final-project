//2023 season data - will need to update when 2024 schedule comes out.

const axios = require('axios');

const nflData = async (req, res) => {

    try {
        const response = await axios.get('https://fixturedownload.com/feed/json/nfl-2023');
        const data = response.data;
        res.json(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      };
};

module.exports = nflData;