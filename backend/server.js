const express = require('express');

const app = express();
const PORT = process.env.PORT || 3100;
var cors = require('cors')

app.use(express.json());
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/weather/:zipcode', async (req, res) => {
    try {
      const { zipcode } = req.params;
      console.log(zipcode)
      const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${zipcode},us&appid=0d4ed5ab2ec3c370df2be128922940b9`);
      const data = await response.json();
      console.log(data)
      const temperature = data.main.temp
      const name = data.name
      const description = data.weather[0].description
      res.json({temperature, name, description})
    } catch (error) {
      console.error('Error fetching weather data:', error);
      res.status(500).json({ error: 'Failed to fetch weather data' });
    }
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});