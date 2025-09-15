async function loadNASAData() {
    const nasaContent = document.getElementById('nasa-content');
    
    try {
        const response = await fetch('http://localhost:3000/api/nasa');
        const data = await response.json();
        
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
        
        nasaContent.innerHTML = `
            <div class="nasa-content">
                <h2>${data.title}</h2>
                ${mediaContent}
                <p class="nasa-description">${data.explanation}</p>
            </div>
        `;
    } catch (error) {
        console.error('Error Loading NASA Data:', error);
        nasaContent.innerHTML = '<p>Failed to Load NASA Data</p>';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadNASAData();
});