let scrapingSource = 'executive-orders';

function toggleScrapingSource() {
    scrapingSource = scrapingSource === 'executive-orders' ? 'doj-rulings' : 'executive-orders';
    loadScrapingData();
}

async function loadScrapingData() {
    const scrapingContent = document.getElementById('scraping-content');
    scrapingContent.innerHTML = '<p>Loading...</p>';
    
    try {
        const response = await fetch(`http://localhost:3000/api/scraping?source=${scrapingSource}`);
        const result = await response.json();
        
        let content = `
            <div class="scraping-content">
                <h2>${result.source}</h2>
                <div class="scraping-list">
        `;
        
        result.data.forEach(item => {
            content += `
                <div class="scraping-item">
                    <p><a href="${item.url}" target="_blank">${item.title}</a></p>
                    <p class="scraping-date">${item.date}</p>
                </div>
            `;
        });
        
        content += `
                </div>
            </div>
        `;
        
        scrapingContent.innerHTML = `
            <button onclick="toggleScrapingSource()">Switch to ${scrapingSource === 'executive-orders' ? 'DOJ Rulings' : 'Executive Orders'}</button>
            ${content}
        `;
        
    } catch (error) {
        console.error('Error Loading Scraping Data:', error);
        scrapingContent.innerHTML = '<p>Failed to Load Government Data</p>';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadScrapingData();
});