let weatherSource = 'nws'; // 'nws' or 'weatherapi'

function toggleWeatherSource() {
    weatherSource = weatherSource === 'nws' ? 'weatherapi' : 'nws';
    loadWeatherData();
}

async function loadWeatherData() {
    const weatherContent = document.getElementById('weather-content');
    
    try {
        const endpoint = weatherSource === 'nws' ? '/api/nws' : '/api/weatherapi';
        const response = await fetch(`http://localhost:3000${endpoint}`);
        const data = await response.json();
        
        let content = '';
        
        if (weatherSource === 'nws') {
            content = `
                <div class="weather-content">
                    <h2>${data.city}, ${data.state}</h2>
                    <span class="temperature">${data.temperature}°F</span>
                    <div> 
                        <p class="weather-text">${data.condition}</p>
                        <p class="weather-text">Feels like ${data.feelsLike}°C</p>
                    </div>
                    <div> 
                        <p class="weather-text">Humidity: ${data.humidity}%</p>
                        <p class="weather-text">Wind: ${data.windSpeed} km/h</p>
                    </div>
                </div>
            `;
        } else {
            content = `
                <div class="weather-content">
                    <h2>${data.city}, ${data.region}</h2>
                    <span class="temperature">${data.temperature}°C</span>
                    <div> 
                        <p class="weather-text">${data.condition}</p>
                        <p class="weather-text">Feels like ${data.feelsLike}°C</p>
                    </div>
                    <div> 
                        <p class="weather-text">Humidity: ${data.humidity}%</p>
                        <p class="weather-text">Wind: ${data.windSpeed} km/h</p>
                    </div>
                </div>
            `;
        }
        
        weatherContent.innerHTML = `
            <button onclick="toggleWeatherSource()">Switch to ${weatherSource === 'nws' ? 'WeatherAPI' : 'NWS'}</button>
            ${content}
        `;
        
    } catch (error) {
        console.error('Error loading weather data:', error);
        weatherContent.innerHTML = '<p>Failed to load weather data</p>';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadWeatherData();
});