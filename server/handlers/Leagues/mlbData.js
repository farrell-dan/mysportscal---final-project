const axios = require('axios');

const mlbData = async (req, res) => {

    try {
        const response = await axios.get('https://fixturedownload.com/feed/json/mlb-2024');
        const data = response.data;
        res.json(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      };
};

module.exports = mlbData;