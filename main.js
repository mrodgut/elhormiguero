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
            img: 'https://fotografias.antena3.com/clipping/cmsimages01/2025/12/04/E3E26DDF-87EE-493E-975A-8683B2D9433A/soy-muy-motivado-estas-cosas-oscar-casas-demuestra-lado-mas-atletico-hormiguero_58.jpg',
            url: 'https://www.atresplayer.com/antena3/programas/el-hormiguero/temporada-19/oscar-casas_674f88425206214588e44286/' // Updated to mimic real structure
        },
        {
            title: 'Ernesto Sevilla y Santiago Segura',
            guest: 'La Navidad en sus manos 2',
            date: '3 Dic 2025',
            img: 'https://fotografias.antena3.com/clipping/cmsimages02/2025/08/29/10121844-4733-4533-8E04-B1AE27BDD35B/todas-novedades-hormiguero-que-arranca-temporada-proximo-lunes_96.jpg',
            url: 'https://www.atresplayer.com/antena3/programas/el-hormiguero/temporada-19/ernesto-sevilla-santiago-segura_674e35d25206214588e3e4a2/'
        },
        {
            title: 'Sonsoles Ónega y Verónica Sánchez',
            guest: 'Las hijas de la criada',
            date: '2 Dic 2025',
            img: 'https://fotografias.antena3.com/clipping/cmsimages01/2024/09/02/B0E8E7A2-1234-4567-89AB-CDEF01234567/sonsoles-onega-veronica-sanchez-presentan-hijas-criada_58.jpg', // Placeholder valid structure
            url: 'https://www.atresplayer.com/antena3/programas/el-hormiguero/temporada-19/sonsoles-onega-veronica-sanchez_674ce3625206214588e386be/'
        },
        {
            title: 'Javier Veiga y Guillermo Francella',
            guest: 'Playa de Lobos',
            date: '1 Dic 2025',
            img: 'https://fotografias.antena3.com/clipping/cmsimages01/2024/11/28/A1B2C3D4-5678-9012-3456-7890ABCDEF12/javier-veiga-guillermo-francella-presentan-playa-lobos_58.jpg', // Placeholder valid structure
            url: 'https://www.atresplayer.com/antena3/programas/el-hormiguero/temporada-19/javier-veiga-guillermo-francella_674b90f25206214588e328da/'
        }
    ];

    const programsGrid = document.querySelector('.experiments-grid');

    if (programsGrid) {
        programsGrid.innerHTML = ''; // Clear existing content
        programs.forEach(prog => {
            const card = document.createElement('div');
            card.className = 'program-card';
            // Fallback for images if they fail (using gradient as solid background)
            card.style.backgroundImage = `url('${prog.img}'), linear-gradient(to bottom, #2c3e50, #000)`;

            card.innerHTML = `
                <div class="program-info">
                    <span class="program-tag">El Hormiguero • ${prog.date}</span>
                    <h3>${prog.title}</h3>
                    <p style="font-size: 0.9rem; color: #ccc; margin-top: 0.2rem;">${prog.guest}</p>
                </div>
            `;

            // Click event to go to Atresplayer specific URL
            card.addEventListener('click', () => {
                window.open(prog.url, '_blank');
            });

            programsGrid.appendChild(card);
        });
    }


    // Cinematic Star Reveal
    const heroTitle = document.querySelector('.hero-title');
    const star = document.getElementById('star');
    const titleWrapper = document.querySelector('.title-wrapper');

    if (heroTitle && star) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';

        // Create Spans (Grouped by words)
        const chars = [];
        const words = text.split(' ');

        words.forEach((wordText) => {
            const wordSpan = document.createElement('span');
            wordSpan.style.display = 'inline-block';
            wordSpan.style.whiteSpace = 'nowrap';
            wordSpan.style.margin = '0 0.15em'; // Space between words

            wordText.split('').forEach(char => {
                const span = document.createElement('span');
                span.textContent = char;
                span.classList.add('char-reveal');
                span.style.animationPlayState = 'paused'; // Wait for star
                wordSpan.appendChild(span);
                chars.push(span);
            });

            heroTitle.appendChild(wordSpan);
        });

        // Animate Star & Text
        const totalTime = 4000; // Slower (not 2s)
        const interval = totalTime / chars.length;

        setTimeout(() => {
            // Animate Star (Spiral/Sine Wave)
            star.style.opacity = '1';

            const startTime = Date.now();

            function animateStar() {
                const now = Date.now();
                const elapsed = now - startTime;
                const progress = Math.min(elapsed / totalTime, 1);

                const x = progress * titleWrapper.offsetWidth;
                // Spiral/Sine effect: move Y up and down
                const y = Math.sin(progress * Math.PI * 10) * 30; // 5 full waves, 30px amplitude

                star.style.transform = `translateY(calc(-50% + ${y}px)) translateX(${x}px)`;

                if (progress < 1) {
                    requestAnimationFrame(animateStar);
                } else {
                    star.style.opacity = '0';

                    // Fade out text after a few seconds
                    setTimeout(() => {
                        heroTitle.classList.add('fade-out');
                    }, 2000);
                }
            }

            requestAnimationFrame(animateStar);

            // Reveal Chars sync
            chars.forEach((span, index) => {
                setTimeout(() => {
                    span.style.animationPlayState = 'running';
                }, index * interval);
            });

        }, 1000); // Start after 1s
    }

    // Peeking Ants & Parallax Trigger
    const heroContent = document.querySelector('.hero-content');

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;

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
