/* --- DATA --- */
const services = [
    { id: 'news', title: 'Real News', icon: 'fa-newspaper', color: '#ff4757' },
    { id: 'comedy', title: 'Comedy', icon: 'fa-masks-theater', color: '#ffa502' },
    { id: 'movies', title: 'Movies', icon: 'fa-film', color: '#2ed573' },
    { id: 'actors', title: 'Talent', icon: 'fa-star', color: '#1e90ff' },
    { id: 'girls', title: 'Models', icon: 'fa-heart', color: '#ff6b81' },
    { id: 'claims', title: 'Claims', icon: 'fa-gift', color: '#3742fa' },
];

const db = {
    news: [
        {title: "AI Breakthrough", desc: "New models released today."}, 
        {title: "Market Watch", desc: "Crypto trends for 2025."}
    ],
    // Fill other categories as needed
    comedy: [{title: "Trending Reel", desc: "Top 10 funny clips."}]
};

/* --- INITIALIZATION --- */
window.onload = function() {
    initCanvas();
    renderSlider();
};

/* --- CANVAS ANIMATION (Space/Grok Effect) --- */
function initCanvas() {
    const canvas = document.getElementById('space-canvas');
    const ctx = canvas.getContext('2d');
    
    let width, height, particles;
    
    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    
    // Particle Class
    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.5; // Slow movement
            this.vy = (Math.random() - 0.5) * 0.5;
            this.size = Math.random() * 2;
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            // Bounce off edges
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
        }
        draw() {
            ctx.fillStyle = 'rgba(255,255,255,0.5)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles() {
        particles = [];
        const count = window.innerWidth < 600 ? 50 : 100; // Less particles on mobile
        for (let i = 0; i < count; i++) particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        
        // Connect particles close to each other
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
            
            for (let j = i; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx*dx + dy*dy);
                
                if (distance < 100) {
                    ctx.strokeStyle = `rgba(255,255,255,${0.1 - distance/1000})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', () => { resize(); initParticles(); });
    resize();
    initParticles();
    animate();
}

/* --- UI LOGIC --- */
function renderSlider() {
    const track = document.getElementById('sliderTrack');
    services.forEach(s => {
        const div = document.createElement('div');
        div.className = 'service-card';
        // Inject color for glow
        div.style.setProperty('--card-color', s.color);
        div.innerHTML = `
            <div class="glow-bg"></div>
            <i class="fas ${s.icon}" style="color:${s.color}"></i>
            <span>${s.title}</span>
        `;
        div.onclick = () => openPage(s);
        track.appendChild(div);
    });
}

function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('active');
}

function openPage(service) {
    // Transition
    document.getElementById('dashboard').classList.add('hidden');
    document.getElementById('dynamic-page').classList.remove('hidden');
    document.getElementById('page-title').innerText = service.title;
    
    // Populate
    const grid = document.getElementById('content-grid');
    grid.innerHTML = '';
    const data = db[service.id] || [];
    
    if(data.length === 0) {
        grid.innerHTML = '<div style="text-align:center; color:#555; padding:20px;">No active content.</div>';
        return;
    }

    data.forEach(item => {
        const div = document.createElement('div');
        div.className = 'content-card';
        div.innerHTML = `
            <div style="width:60px; height:60px; background:#222; border-radius:10px; flex-shrink:0;"></div>
            <div>
                <h4 style="margin-bottom:5px;">${item.title}</h4>
                <p style="color:#888; font-size:0.85rem;">${item.desc}</p>
            </div>
        `;
        grid.appendChild(div);
    });
}

function openPageById(id) {
    const service = services.find(s => s.id === id);
    if(service) openPage(service);
}

function goHome() {
    document.getElementById('dynamic-page').classList.add('hidden');
    document.getElementById('dashboard').classList.remove('hidden');
}

/* --- SEARCH --- */
function filterServices() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const results = document.getElementById('searchResults');
    
    if(!input) { results.classList.add('hidden'); return; }
    
    const matches = services.filter(s => s.title.toLowerCase().includes(input));
    results.classList.remove('hidden');
    results.innerHTML = '';
    
    matches.forEach(s => {
        const div = document.createElement('div');
        div.className = 'result-item';
        div.innerText = s.title;
        div.onclick = () => { openPage(s); results.classList.add('hidden'); };
        results.appendChild(div);
    });
}
