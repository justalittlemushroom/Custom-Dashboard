let nasaSource = 'apod';

function toggleNASASource() {
    nasaSource = nasaSource === 'apod' ? 'mars-rover' : 'apod';
    loadNASAData();
}

async function loadNASAData() {
    const nasaContent = document.getElementById('nasa-content');
    
    try {
        const endpoint = nasaSource === 'apod' ? '/api/nasa' : '/api/mars-rover';
        const response = await fetch(`http://localhost:3000${endpoint}`);
        const data = await response.json();
        
        let content = '';
        
        if (nasaSource === 'apod') {
            // APOD Content
            let mediaContent = '';
            
            if (data.media_type === 'image' && (data.url || data.hdurl)) {
                const imageUrl = data.hdurl || data.url;
                mediaContent = `<img src="${imageUrl}" alt="${data.title}" class="nasa-image">`;
            } else if (data.media_type === 'video' && data.url) {
                mediaContent = `<iframe src="${data.url}" width="600" height="300"></iframe>`;
            } else {
                const date = new Date(data.date);
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');
                const apodUrl = `https://apod.nasa.gov/apod/ap${String(year).slice(-2)}${month}${day}.html`;
                
                mediaContent = `
                    <div class="nasa-other">
                        <a href="${apodUrl}" target="_blank" class="nasa-url">
                            View on NASA APOD Website
                        </a>
                    </div>`;
            }
            
            content = `
                <div class="nasa-content">
                    <h2>${data.title}</h2>
                    ${mediaContent}
                    <p class="nasa-description">${data.explanation}</p>
                </div>
            `;
        } else {
            // Mars Rover Content
            content = `
                <div class="nasa-content">
                    <h2>Mars Rover - ${data.rover}</h2>
                    <img src="${data.img_src}" alt="Mars Surface" class="nasa-image">
                    <p><strong>Camera:</strong> ${data.camera}</p>
                    <p><strong>Earth Date:</strong> ${data.earth_date}</p>
                    <p><strong>Sol:</strong> ${data.sol} (Mars day)</p>
                </div>
            `;
        }
        
        nasaContent.innerHTML = `
            <button onclick="toggleNASASource()">Switch to ${nasaSource === 'apod' ? 'Mars Rover' : 'APOD'}</button>
            ${content}
        `;
        
    } catch (error) {
        console.error('Error Loading NASA Data:', error);
        nasaContent.innerHTML = '<p>Failed to Load NASA Data</p>';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadNASAData();
});