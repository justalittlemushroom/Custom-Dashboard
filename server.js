const cors = require('cors');
const express = require('express');
require('dotenv').config();

const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const { chromium } = require('playwright');

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

app.get('/api/scraping', async (req, res) => {
  try {
    const source = req.query.source || 'executive-orders';
    
    if (source === 'executive-orders') {
      const data = await scrapeExecutiveOrders();
      res.json(data);
    } else if (source === 'doj-rulings') {
      const data = await scrapeDOJRulings();
      res.json(data);
    } else {
      res.status(400).json({ error: 'Invalid Source Parameter' });
    }
  } catch (error) {
    console.error('Scraping Error:', error);
    res.status(500).json({ error: 'Failed to Scrape Data' });
  }
});

async function scrapeExecutiveOrders() {
  let browser;
  try {
    browser = await chromium.launch();
    const page = await browser.newPage();
    
    await page.goto('https://www.whitehouse.gov/briefing-room/presidential-actions/');
    
    // Wait for page to load
    await page.waitForSelector('.post', { timeout: 10000 });
    
    const orders = await page.$$eval('.post', posts => {
      return posts.slice(0, 8).map(post => {
        // Look for title link within each post
        const titleElement = post.querySelector('h3 a') || post.querySelector('h2 a') || post.querySelector('a');
        const dateElement = post.querySelector('time') || post.querySelector('.date');
        
        return {
          title: titleElement ? titleElement.textContent.trim() : 'No title found',
          url: titleElement ? titleElement.href : '',
          date: dateElement ? dateElement.textContent.trim() : 'No date found'
        };
      });
    });
    
    await browser.close();
    return { source: 'Executive Orders', data: orders };
    
  } catch (error) {
    if (browser) await browser.close();
    throw error;
  }
}

async function scrapeDOJRulings() {
  const chromeOptions = new chrome.Options();
  chromeOptions.addArguments('--headless=new');
  chromeOptions.addArguments('--no-sandbox');
  chromeOptions.addArguments('--disable-dev-shm-usage');
  chromeOptions.addArguments('--disable-gpu');
  chromeOptions.addArguments('--window-size=1920,1080');

  let driver = await new Builder().forBrowser('chrome').setChromeOptions(chromeOptions).build();
  
  try {
    await driver.get('https://www.justice.gov/news');
    
    // Wait for elements to load
    await driver.wait(until.elementsLocated(By.css('.views-row')), 5000);
    
    const elements = await driver.findElements(By.css('.views-row'));
    const rulings = [];
    
    for (let i = 0; i < Math.min(elements.length, 8); i++) {
      const element = elements[i];
      
      try {
        // Try different title selectors
        let titleElement, dateElement;
        
        try {
          titleElement = await element.findElement(By.css('h3 a'));
        } catch {
          try {
            titleElement = await element.findElement(By.css('h2 a'));
          } catch {
            titleElement = await element.findElement(By.css('a'));
          }
        }
        
        // Try different date selectors
        try {
          dateElement = await element.findElement(By.css('.field-date'));
        } catch {
          try {
            dateElement = await element.findElement(By.css('time'));
          } catch {
            dateElement = await element.findElement(By.css('[class*="date"]'));
          }
        }
        
        const title = await titleElement.getText();
        const url = await titleElement.getAttribute('href');
        const date = dateElement ? await dateElement.getText() : 'No Date';
        
        rulings.push({ title, url, date });
        
      } catch (err) {
        console.log('Skipping Element', i, '- Error:', err.message);
        continue;
      }
    }
    
    await driver.quit();
    return { source: 'DOJ News', data: rulings };
    
  } catch (error) {
    await driver.quit();
    throw error;
  }
}