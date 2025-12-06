document.addEventListener('DOMContentLoaded', () => {
    // Loader
    setTimeout(() => {
        const loader = document.getElementById('loader');
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.remove();
        }, 500);
    }, 2000);


    // Mobile Menu Logic
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking a link
        links.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // Programs / Science Section Content (Redesigned)
    const programs = [
        {
            title: 'Óscar Casas',
            guest: 'Gervasio Deferr (El Gran Salto)',
            date: '4 Dic 2025',
            img: 'assets/header_real.jpg'
        },
        {
            title: 'Ernesto Sevilla y Santiago Segura',
            guest: 'La Navidad en sus manos 2',
            date: '3 Dic 2025',
            img: 'assets/header_real.jpg'
        },
        {
            title: 'Sonsoles Ónega y Verónica Sánchez',
            guest: 'Las hijas de la criada',
            date: '2 Dic 2025',
            img: 'assets/header_real.jpg'
        },
        {
            title: 'Javier Veiga y Guillermo Francella',
            guest: 'Playa de Lobos',
            date: '1 Dic 2025',
            img: 'assets/header_real.jpg'
        }
    ];

    const programsGrid = document.querySelector('.experiments-grid');

    if (programsGrid) {
        programsGrid.innerHTML = ''; // Clear existing content
        programs.forEach(prog => {
            const card = document.createElement('div');
            card.className = 'program-card';
            // Fallback for images if they fail (using gradient as solid background)
            card.style.backgroundImage = `url('${prog.img}')`;

            card.innerHTML = `
                <div class="program-info">
                    <span class="program-tag">El Hormiguero • ${prog.date}</span>
                    <h3>${prog.title}</h3>
                    <p style="font-size: 0.9rem; color: #ccc; margin-top: 0.2rem;">${prog.guest}</p>
                </div>
            `;

            // Interaction removed for design demo
            programsGrid.appendChild(card);
        });
    }


    // Cinematic Star Reveal & Word splitting logic
    function setupHeroAnimation() {
        const title = document.querySelector('.hero-title');
        const star = document.getElementById('star');

        if (!title) return;

        const text = "HOY HA VENIDO A DIVERTIRSE...";
        title.innerHTML = '';

        // 1. Generate HTML structure (Words > Chars)
        const words = text.split(' ');

        words.forEach((word, wordIndex) => {
            const wordSpan = document.createElement('span');
            wordSpan.className = 'word-wrapper';
            wordSpan.style.setProperty('--word-index', wordIndex);

            const chars = word.split('').map((char, charIndex) => {
                // Staggered delay for desktop dust effect
                // Mobile will override this with its own CSS animation
                return `<span class="char-reveal" style="animation-delay: ${(wordIndex * 0.2) + (charIndex * 0.05)}s">${char}</span>`;
            }).join('');

            wordSpan.innerHTML = chars;
            title.appendChild(wordSpan);

            if (wordIndex < words.length - 1) {
                title.appendChild(document.createTextNode(' '));
            }
        });

        // 2. Trigger Visibility
        setTimeout(() => title.classList.remove('fade-out'), 100);

        // 3. Star Animation (Optical Sugar)
        if (star) {

            // Hero Parallax
            if (scrolled < window.innerHeight) {
                heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
                heroContent.style.opacity = 1 - (scrolled / 700);
            }
        });

// Fireworks Effect
function createFirework(x, y) {
    const colors = ['#FFD700', '#FF0000', '#00FF00', '#0000FF', '#FFFFFF'];
    const particles = 30;

    for (let i = 0; i < particles; i++) {
        const el = document.createElement('div');
        el.style.position = 'fixed';
        el.style.left = x + 'px';
        el.style.top = y + 'px';
        el.style.width = '6px';
        el.style.height = '6px';
        el.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        el.style.borderRadius = '50%';
        el.style.pointerEvents = 'none';
        el.style.zIndex = '9999';

        // Random direction
        const angle = Math.random() * Math.PI * 2;
        const velocity = 2 + Math.random() * 4;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;

        document.body.appendChild(el);

        // Animate
        let posX = x;
        let posY = y;
        let opacity = 1;

        const anim = setInterval(() => {
            posX += vx;
            posY += vy + 2; // gravity
            opacity -= 0.02;

            el.style.left = posX + 'px';
            el.style.top = posY + 'px';
            el.style.opacity = opacity;

            if (opacity <= 0) {
                clearInterval(anim);
                el.remove();
            }
        }, 16);
    }
}

// Attach fireworks to buttons
document.querySelectorAll('.experiment-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const rect = btn.getBoundingClientRect();
        createFirework(rect.left + rect.width / 2, rect.top + rect.height / 2);
    });
});
    });
