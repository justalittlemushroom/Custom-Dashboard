# Custom Dashboard Project

A cross-platform desktop application integrating multiple data sources with interactive visualizations, real-time content aggregation, and automated web scraping pipelines.

## 🚀 Features

- **Interactive Maze Generation & Pathfinding**: Animated Kruskal's algorithm with BFS/DFS visualization
- **NASA Data Integration**: Daily space imagery (APOD) and live Mars Rover photography
- **Multi-Source Weather Data**: Comparative weather data from government and commercial APIs
- **Government Data Scraping**: Real-time scraping from WhiteHouse.gov and DOJ using Playwright/Selenium
- **Cross-Platform Desktop App**: Built with Electron for Windows, macOS, and Linux

## 🛠 Technology Stack

- **Frontend**: Electron, Unity WebGL, Vanilla JavaScript, CSS3
- **Backend**: Node.js + Express RESTful API server
- **APIs**: NASA (APOD, Mars Rover), National Weather Service, WeatherAPI
- **Web Scraping**: Playwright (headless Chromium) and Selenium (Chrome WebDriver)
- **Algorithms**: Kruskal's MST, Union-Find, BFS/DFS pathfinding

## 🎨 Design & Development Process

**Timeline**: 3 days from concept to deployment

- **Day 1**: Converted existing Java maze generator to Unity WebGL build + Algorithm implementation
- **Day 2**: Set up Electron dashboard + WebGL integration + NASA and Weather API integration
- **Day 3**: Added web scraping pipelines for government data sources

## 🔧 Technical Highlights

### Algorithm Visualization
- **Maze Generation**: Animated Kruskal's algorithm with Union-Find data structure
- **Pathfinding**: Real-time BFS (Press 'B') and DFS (Press 'D') with visual feedback
- **Performance**: 60 FPS Unity rendering with efficient memory management

### Data Integration
- **NASA APIs**: Astronomy Picture of the Day and Mars Rover missions
- **Weather Comparison**: National Weather Service vs commercial WeatherAPI
- **Government Scraping**: Executive orders and DOJ announcements with automated pipelines

### Cross-Platform Architecture
- **Electron Framework**: Single codebase for desktop deployment
- **Unity WebGL**: Interactive visualizations embedded in desktop app
- **Modular Design**: Independent widget system with isolated data sources

## 🎯 API Endpoints

- `GET /api/nasa` - NASA Astronomy Picture of the Day
- `GET /api/mars-rover` - Latest Mars Rover photographs
- `GET /api/weather` - National Weather Service data
- `GET /api/weather-alt` - Alternative weather API data
- `GET /api/scraping?source=executive-orders` - White House executive orders
- `GET /api/scraping?source=doj-rulings` - DOJ announcements

## 🚀 Quick Start

### Prerequisites
- Node.js 16+, Chrome browser, Unity 2022.3+ (for modifications)

### Installation
```bash
git clone https://github.com/justalittlemushroom/Custom-Dashboard.git
cd Custom-Dashboard
npm install
npx playwright install chromium
```

### Environment Setup
```env
NASA_API_KEY=your_nasa_api_key
WEATHER_API_ALT_KEY=your_weatherapi_key
```

### Run Application
```bash
# Start Express server
node server.js

# Start Electron app
npm start
```

## 🎮 Controls

### Dashboard Navigation
- **NASA Toggle**: Switch between APOD and Mars Rover imagery
- **Weather Toggle**: Compare different weather data sources
- **Scraping Toggle**: Switch between government data feeds

### Maze Interface
- **B**: Breadth-First Search pathfinding
- **D**: Depth-First Search pathfinding  
- **R**: Reset search and clear visualization

## 💡 Key Development Decisions

### Unity WebGL Integration
Chose Unity for algorithm visualization to provide smooth 60 FPS rendering and interactive controls within the Electron desktop environment.

### Hybrid Scraping Architecture
Implemented both Playwright and Selenium for maximum website compatibility.

### Multi-Source Data Strategy
Integrated multiple APIs per data type (weather, space) to provide data comparison and ensure reliability through redundancy.

## 🎯 Learning Outcomes

- Cross-platform desktop application development with Electron
- Unity WebGL integration and browser deployment
- Algorithm visualization and interactive educational tools
- Web scraping with modern automation frameworks
- RESTful API design and multi-source data aggregation
- Real-time data processing and error handling

---

*Built to demonstrate full-stack development, algorithm visualization, data integration, and cross-platform desktop application architecture.*
