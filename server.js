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

app.get('/api/mars-rover', async (req, res) => {
  try {
    // Get latest photos from Curiosity rover
    const response = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/latest_photos?api_key=${process.env.NASA_API_KEY}`);
    const data = await response.json();
    
    console.log('Mars Rover API Response:', data);
    
    // Get a random photo from the latest batch
    const photos = data.latest_photos;
    if (photos && photos.length > 0) {
      const randomPhoto = photos[Math.floor(Math.random() * photos.length)];
      
      res.json({
        id: randomPhoto.id,
        img_src: randomPhoto.img_src,
        earth_date: randomPhoto.earth_date,
        rover: randomPhoto.rover.name,
        camera: randomPhoto.camera.full_name,
        sol: randomPhoto.sol
      });
    } else {
      res.json({ error: 'No Photos Available' });
    }
  } catch (error) {
    console.error('Mars Rover API Error:', error);
    res.status(500).json({ error: 'Failed to Fetch Mars Rover Data' });
  }
});

app.get('/api/nws', async (req, res) => {
  try {
    // For demo, using Boston coordinates
    const lat = req.query.lat || '42.3601';
    const lon = req.query.lon || '-71.0589';
    
    // Get the forecast office and grid coordinates
    const pointResponse = await fetch(`https://api.weather.gov/points/${lat},${lon}`);
    const pointData = await pointResponse.json();
    
    // Get list of observation stations
    const stationsResponse = await fetch(pointData.properties.observationStations);
    const stationsData = await stationsResponse.json();
    
    // Get the first available station
    const firstStation = stationsData.features[0].id;
    
    // Get current conditions from that station
    const currentResponse = await fetch(`${firstStation}/observations/latest`);
    const currentData = await currentResponse.json();
    
    // Handle temperature conversion (might be null)
    const tempC = currentData.properties.temperature.value;
    const tempF = tempC ? Math.round((tempC * 9/5) + 32) : 'N/A';
    
    res.json({
      city: pointData.properties.relativeLocation.properties.city,
      state: pointData.properties.relativeLocation.properties.state,
      temperature: tempF,
      description: currentData.properties.textDescription || 'N/A',
      humidity: currentData.properties.relativeHumidity.value || 'N/A',
      windSpeed: currentData.properties.windSpeed.value ? 
        Math.round(currentData.properties.windSpeed.value * 0.621371) : 'N/A'
    });
  } catch (error) {
    console.error('NWS API Error:', error);
    res.status(500).json({ error: 'Failed to Fetch NWS Weather Data' });
  }
});

app.get('/api/weatherapi', async (req, res) => {
  try {
    const city = req.query.city || 'Boston';
    const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${city}&aqi=no`);
    const data = await response.json();
    
    res.json({
      city: data.location.name,
      region: data.location.region,
      temperature: Math.round(data.current.temp_c),
      condition: data.current.condition.text,
      icon: data.current.condition.icon,
      humidity: data.current.humidity,
      windSpeed: data.current.wind_kph,
      feelsLike: Math.round(data.current.feelslike_c)
    });
  } catch (error) {
    console.error('WeatherAPI Error:', error);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});