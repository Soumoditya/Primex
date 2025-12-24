// --- CONFIGURATION ---
const services = [
    { id: 'news', title: 'Real News', icon: 'fa-newspaper', color: '#ff0055' },
    { id: 'comedy', title: 'Comedy Hub', icon: 'fa-masks-theater', color: '#ffd60a' },
    { id: 'movies', title: 'Cineplex', icon: 'fa-film', color: '#7209b7' },
    { id: 'actors', title: 'Top Talent', icon: 'fa-star', color: '#3a86ff' },
    { id: 'girls', title: 'IG Models', icon: 'fa-heart', color: '#fb5607' },
    { id: 'claims', title: 'Free Claims', icon: 'fa-gift', color: '#00b4d8' },
];

// --- CONTENT DATABASE (EDIT THIS) ---
const db = {
    news: [
        { title: "Tech World 2025", desc: "The rise of new AI models.", img: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=100&q=80" },
        { title: "Global Markets", desc: "Crypto hits all time high.", img: "https://images.unsplash.com/photo-1611974765270-ca1258634369?auto=format&fit=crop&w=100&q=80" }
    ],
    movies: [
        { title: "Interstellar", desc: "Sci-Fi / Adventure", link: "https://netflix.com" },
        { title: "The Batman", desc: "Action / Noir", link: "https://hbo.com" }
    ],
    girls: [
        { title: "Anna Shumate", desc: "@annashumate", img: "https://via.placeholder.com/100" },
        { title: "Kylie Jenner", desc: "@kyliejenner", img: "https://via.placeholder.com/100" }
    ]
    // Add more categories following the pattern...
};

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    renderServices();
});

// --- RENDER SLIDER ---
function renderServices() {
    const track = document.getElementById('sliderTrack');
    services.forEach(s => {
        const card = document.createElement('div');
        card.className = 'glass-card-btn';
        // Dynamic Glow based on specific color
        card.style.boxShadow = `inset 0 0 0 transparent`;
        card.onmouseover = function() { this.style.boxShadow = `0 10px 30px -10px ${s.color}`; };
        card.onmouseout = function() { this.style.boxShadow = `none`; };

        card.innerHTML = `
            <i class="fas ${s.icon}" style="filter: drop-shadow(0 0 5px ${s.color});"></i>
            <span>${s.title}</span>
        `;
        card.onclick = () => openPage(s);
        track.appendChild(card);
    });
}

// --- NAVIGATION ---
function openPage(service) {
    document.getElementById('welcome').style.opacity = '0';
    setTimeout(() => {
        document.getElementById('welcome').classList.add('hidden');
        document.getElementById('dynamic-content').classList.remove('hidden');
        document.getElementById('dynamic-content').style.opacity = '1';
        
        // Load Data
        document.getElementById('page-title').innerText = service.title;
        const grid = document.getElementById('content-grid');
        grid.innerHTML = '';
        
        const data = db[service.id] || [];
        if(data.length === 0) grid.innerHTML = '<p style="color:#666">Nothing here yet.</p>';

        data.forEach(item => {
            const div = document.createElement('div');
            div.className = 'content-card glass-panel';
            // Check if image exists, else use icon
            const imgHTML = item.img 
                ? `<img src="${item.img}" alt="">` 
                : `<div style="width:60px;height:60px;background:#333;border-radius:12px;display:flex;align-items:center;justify-content:center"><i class="fas fa-link"></i></div>`;
            
            div.innerHTML = `
                ${imgHTML}
                <div class="content-info">
                    <h4>${item.title}</h4>
                    <p>${item.desc}</p>
                </div>
                ${item.link ? `<a href="${item.link}" target="_blank" style="margin-left:auto; color:var(--accent-cyan)"><i class="fas fa-external-link-alt"></i></a>` : ''}
            `;
            grid.appendChild(div);
        });
    }, 300);
}

function goHome() {
    document.getElementById('dynamic-content').style.opacity = '0';
    setTimeout(() => {
        document.getElementById('dynamic-content').classList.add('hidden');
        document.getElementById('welcome').classList.remove('hidden');
        document.getElementById('welcome').style.opacity = '1';
    }, 300);
}

// --- SEARCH ---
function filterServices() {
    const input = document.getElementById('serviceSearch').value.toLowerCase();
    const resultBox = document.getElementById('searchResults');
    resultBox.innerHTML = '';
    
    if(!input) { resultBox.style.display = 'none'; return; }

    const found = services.filter(s => s.title.toLowerCase().includes(input));
    if(found.length > 0) {
        resultBox.style.display = 'block';
        found.forEach(s => {
            const div = document.createElement('div');
            div.className = 'search-item';
            div.innerHTML = `<i class="fas ${s.icon}"></i> ${s.title}`;
            div.onclick = () => { openPage(s); resultBox.style.display = 'none'; };
            resultBox.appendChild(div);
        });
    }
}
