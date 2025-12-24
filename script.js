// --- CONFIGURATION: EDIT YOUR LISTS HERE ---
const services = [
    { id: 'real_news', title: 'Real News', icon: 'fa-newspaper', type: 'list' },
    { id: 'comedy', title: 'IG Comedy Creators', icon: 'fa-laugh-beam', type: 'list' },
    { id: 'movies', title: 'Movies & Series', icon: 'fa-film', type: 'list' },
    { id: 'actors', title: 'Talented Actors', icon: 'fa-star', type: 'list' },
    { id: 'ig_girls', title: 'Cute IG Girls', icon: 'fa-heart', type: 'image-grid' },
    { id: 'hot_actress', title: 'Hot Actresses', icon: 'fa-fire', type: 'image-grid' },
    { id: 'announce', title: 'Announcements', icon: 'fa-bullhorn', type: 'text' },
    { id: 'claims', title: 'Free Claims', icon: 'fa-gift', type: 'list' },
    { id: 'stream', title: 'Free Stream Sites', icon: 'fa-play-circle', type: 'list' }
];

// Mock Data for specific pages (You fill this with real data)
const db = {
    real_news: [
        { title: "Global Tech Update", desc: "AI takes over 2024..." },
        { title: "Crypto Market Watch", desc: "Bitcoin hits new high..." }
    ],
    movies: [
        { title: "Inception", desc: "Sci-Fi Thriller", link: "#" },
        { title: "Breaking Bad", desc: "Crime Drama", link: "#" }
    ],
    ig_girls: [
        { title: "Model Name 1", img: "https://via.placeholder.com/300" },
        { title: "Model Name 2", img: "https://via.placeholder.com/300" }
    ],
    // Add other categories here...
    announce: [ {text: "Server maintenance scheduled for Friday."} ]
};

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    renderSlider();
    renderNav();
});

// --- RENDER FUNCTIONS ---
function renderSlider() {
    const track = document.getElementById('sliderTrack');
    services.forEach(service => {
        const card = document.createElement('div');
        card.className = 'slide-card';
        card.innerHTML = `<i class="fas ${service.icon}"></i><span>${service.title}</span>`;
        card.onclick = () => openPage(service);
        track.appendChild(card);
    });
}

function renderNav() {
    const nav = document.getElementById('nav-links');
    services.forEach(service => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="#" onclick="openPageById('${service.id}'); toggleNav()">${service.title}</a>`;
        nav.appendChild(li);
    });
}

// --- NAVIGATION LOGIC ---
function toggleNav() {
    document.getElementById('navbar').classList.toggle('active');
}

function openPageById(id) {
    const service = services.find(s => s.id === id);
    if(service) openPage(service);
}

function openPage(service) {
    // Hide Welcome, Show Dynamic
    document.getElementById('welcome').classList.add('hidden');
    const dynamicPage = document.getElementById('dynamic-content');
    dynamicPage.classList.remove('hidden');
    
    // Set Title
    document.getElementById('page-title').innerText = service.title;
    
    // Populate Content
    const grid = document.getElementById('content-grid');
    grid.innerHTML = ''; // Clear previous
    
    const data = db[service.id] || [];

    if(data.length === 0) {
        grid.innerHTML = '<p style="color:#666; grid-column: 1/-1;">No content available yet.</p>';
        return;
    }

    // Render based on type
    data.forEach(item => {
        const div = document.createElement('div');
        div.className = 'grid-item';
        
        if(service.type === 'image-grid') {
            div.innerHTML = `
                <img src="${item.img}" alt="img">
                <h3 style="color:#d4af37">${item.title}</h3>
            `;
        } else if (service.type === 'text') {
            div.innerHTML = `<p>${item.text}</p>`;
        } else {
            div.innerHTML = `
                <h3 style="color:#d4af37">${item.title}</h3>
                <p style="color:#aaa; font-size:0.9rem">${item.desc}</p>
                ${item.link ? `<a href="${item.link}" style="color:white; margin-top:10px; display:block">Open ></a>` : ''}
            `;
        }
        grid.appendChild(div);
    });
}

function goHome() {
    document.getElementById('dynamic-content').classList.add('hidden');
    document.getElementById('welcome').classList.remove('hidden');
}

// --- SEARCH LOGIC ---
function filterServices() {
    const input = document.getElementById('serviceSearch').value.toLowerCase();
    const resultBox = document.getElementById('searchResults');
    resultBox.innerHTML = '';
    
    if(input.length === 0) {
        resultBox.style.display = 'none';
        return;
    }

    const filtered = services.filter(s => s.title.toLowerCase().includes(input));
    
    if(filtered.length > 0) {
        resultBox.style.display = 'block';
        filtered.forEach(s => {
            const div = document.createElement('div');
            div.className = 'search-item';
            div.innerText = s.title;
            div.onclick = () => {
                openPage(s);
                resultBox.style.display = 'none';
                document.getElementById('serviceSearch').value = '';
            };
            resultBox.appendChild(div);
        });
    } else {
        resultBox.style.display = 'none';
    }
}
