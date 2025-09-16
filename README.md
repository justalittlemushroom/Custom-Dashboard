# Custom Dashboard Project

Cross-platform desktop application built with Electron integrating multiple data sources and interactive visualizations.

## Current Implementation Status

### ✅ Completed Features

**Interactive Maze Generation**
- Kruskal's algorithm implementation for maze generation
- Animated BFS and DFS pathfinding visualization  
- Unity WebGL integration within Electron application
- Real-time algorithm step visualization with user controls (B for BFS, D for DFS, R for reset)

**NASA Data Integration**
- NASA APOD (Astronomy Picture of the Day) API integration
- Mars Rover Photos API for latest Curiosity rover images
- Toggle functionality between different NASA data sources
- Handles multiple media types (images, videos, simulations)

**Weather Data Sources**
- National Weather Service API integration (official US government data)
- WeatherAPI.com integration for enhanced weather details
- Toggle between different weather data providers
- Real-time weather conditions display

**Backend API Server**
- Express.js server handling all API integrations
- CORS-enabled endpoints for frontend communication
- Error handling and data transformation
- Environment variable configuration for API keys

### 🏗️ In Progress

**Web Scraping Pipeline**
- Selenium and Playwright setup for government data scraping
- Target sources: Executive orders, DOJ rulings
- Real-time content aggregation planned

## Technology Stack

**Frontend:**
- Electron (cross-platform desktop app)
- Unity WebGL (maze visualization)
- Vanilla JavaScript (API integration)
- HTML5/CSS3

**Backend:**
- Node.js/Express.js
- NASA APIs
- National Weather Service API
- WeatherAPI.com

**Algorithms & Data Structures:**
- Kruskal's algorithm (minimum spanning tree)
- Union-Find data structure
- BFS and DFS search algorithms
- Graph theory implementation

**Planned:**
- Selenium WebDriver
- Playwright automation
- Web scraping pipelines

## Project Structure

```
dashboard-app/
├── main.js              # Electron main process
├── index.html           # Main dashboard interface
├── styles.css           # Dashboard styling
├── server.js            # Express API server
├── nasa.js              # NASA API frontend logic
├── weather.js           # Weather API frontend logic
├── unity-loader.js      # Unity WebGL integration
├── unity-maze/          # Unity build files
│   ├── Build/
│   ├── TemplateData/
│   └── index.html
└── .env                 # API keys (not committed)
```

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install electron express cors dotenv --save-dev
   ```

2. Create `.env` file with API keys:
   ```
   NASA_API_KEY=your_nasa_key
   WEATHER_API_ALT_KEY=your_weatherapi_key
   ```

3. Start the API server:
   ```bash
   node server.js
   ```

4. Run the Electron app:
   ```bash
   npm start
   ```

## API Endpoints

- `GET /api/nasa` - NASA APOD data
- `GET /api/mars-rover` - Mars Rover photos
- `GET /api/weather` - National Weather Service data
- `GET /api/weather-alt` - WeatherAPI.com data

## Features Demo

- **Maze Generation**: Animated Kruskal's algorithm creating solvable mazes
- **Pathfinding**: Visual BFS/DFS algorithm comparison
- **Data Integration**: Multiple API sources with toggle functionality
- **Real-time Updates**: Live weather and space data feeds

## Next Steps

1. Implement web scraping for government data sources
2. Add remaining data pipeline integrations  
3. Enhance UI/UX design and layout
4. Add error handling and offline functionality
5. Optimize performance and bundle size

---

*This is a technical demonstration project showcasing full-stack development, algorithm implementation, API integration, and desktop application development skills.*
