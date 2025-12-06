document.addEventListener('DOMContentLoaded', () => {
    // Loader
    setTimeout(() => {
        const loader = document.getElementById('loader');
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.remove();
        }, 500);
    }, 2000);



    // Science Section Content
    const experiments = [
        { title: 'Nitrógeno Líquido', desc: 'Congelando cosas a -196ºC', color: '#00d2ff' },
        { title: 'Fuego Invisible', desc: 'Llamas que no puedes ver pero queman', color: '#ff4d4d' },
        { title: 'Cámara de Vacío', desc: '¿Qué pasa si quitamos el aire?', color: '#bf00ff' }
    ];

    const experimentsGrid = document.querySelector('.experiments-grid');

    experiments.forEach(exp => {
        const card = document.createElement('div');
        card.className = 'science-card';
        card.style.setProperty('--card-color', exp.color);
        card.innerHTML = `
      <div class="card-glow"></div>
      <h3>${exp.title}</h3>
      <p>${exp.desc}</p>
      <button class="experiment-btn">VER MÁS</button>
    `;

        // Interactive hover effect
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });

        experimentsGrid.appendChild(card);
    });

    // Scroll animations for Science Section
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.section-title').forEach(el => observer.observe(el));

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
