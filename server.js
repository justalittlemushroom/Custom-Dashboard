const cors = require('cors');
const express = require('express');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/api/nasa', async (req, res) => {
  try {
    // NASA APOD (Astronomy Picture of the Day) API
    const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}`);
    const data = await response.json();

    console.log('NASA API Response:', data);
    
    res.json({
      title: data.title,
      url: data.url,
      hdurl: data.hdurl,
      explanation: data.explanation,
      media_type: data.media_type
    });
  } catch (error) {
    console.error('NASA API Error:', error);
    res.status(500).json({ error: 'Failed to Fetch NASA Data' });
  }
});

app.get('/api/weather', async (req, res) => {
  try {
    const city = req.query.city || 'Boston'; // Default to Boston
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}&units=imperial`);
    const data = await response.json();
    
    res.json({
      city: data.name,
      temperature: Math.round(data.main.temp),
      description: data.weather[0].description,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed
    });
  } catch (error) {
    console.error('Weather API Error:', error);
    res.status(500).json({ error: 'Failed to Fetch Weather Data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});