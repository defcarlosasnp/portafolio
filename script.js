document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();

    // =============================================
    // 1. ANIMACIÓN DE REVELADO AL HACER SCROLL
    // =============================================
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // =============================================
    // 2. FONDO ANIMADO: RED DE PARTÍCULAS + CÓDIGO
    // =============================================
    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // --- Partículas ---
    const NUM_PARTICLES = 65;
    const MAX_DIST = 155;
    const particles = [];

    for (let i = 0; i < NUM_PARTICLES; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.45,
            vy: (Math.random() - 0.5) * 0.45,
            r: Math.random() * 1.6 + 0.4
        });
    }

    // --- Palabras de código flotantes ---
    const CODE_WORDS = [
        'const', '=>', 'async', 'await', 'function()',
        'import', '{...}', '.map()', 'git push', '</div>',
        'SELECT *', 'return', 'useState()', 'REST API', 'JSON',
        'npm i', 'docker run', 'class', 'interface', 'typeof',
        'Prefect', 'PL/SQL', 'SQL Server', 'ETL', 'API REST',
        'Python', 'PHP', 'React', 'pipeline', 'endpoints'
    ];

    const floaters = [];
    for (let i = 0; i < 22; i++) {
        floaters.push({
            word: CODE_WORDS[Math.floor(Math.random() * CODE_WORDS.length)],
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vy: -(0.15 + Math.random() * 0.25),
            maxOpacity: 0.055 + Math.random() * 0.055,
            fontSize: 10 + Math.random() * 5,
            phase: Math.random() * Math.PI * 2
        });
    }

    // --- Loop de animación ---
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const isDark = document.body.classList.contains('dark-theme');
        const dotAlpha  = isDark ? 0.45 : 0.28;
        const lineAlpha = isDark ? 0.22 : 0.14;
        const wordAlpha = isDark ? 1.0  : 0.65;
        const rgb = isDark ? '59,130,246' : '37,99,235';

        // Partículas
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${rgb},${dotAlpha})`;
            ctx.fill();
        });

        // Conexiones
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const d  = Math.sqrt(dx * dx + dy * dy);
                if (d < MAX_DIST) {
                    const a = (1 - d / MAX_DIST) * lineAlpha;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(${rgb},${a})`;
                    ctx.lineWidth = 0.7;
                    ctx.stroke();
                }
            }
        }

        // Palabras de código
        floaters.forEach(fw => {
            fw.y += fw.vy;
            fw.phase += 0.004;
            const opacity = fw.maxOpacity * wordAlpha * (0.5 + 0.5 * Math.sin(fw.phase));

            if (fw.y < -20) {
                fw.y = canvas.height + 20;
                fw.x = Math.random() * canvas.width;
                fw.word = CODE_WORDS[Math.floor(Math.random() * CODE_WORDS.length)];
            }

            ctx.font = `bold ${fw.fontSize}px 'Courier New', monospace`;
            ctx.fillStyle = isDark
                ? `rgba(96,165,250,${opacity})`
                : `rgba(37,99,235,${opacity})`;
            ctx.fillText(fw.word, fw.x, fw.y);
        });

        requestAnimationFrame(draw);
    }

    draw();

    // =============================================
    // 3. MODO OSCURO / CLARO
    // =============================================
    const toggleDark = document.getElementById('toggle-dark');
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'light') {
        document.body.classList.remove('dark-theme');
        toggleDark.innerHTML = '<i data-lucide="sun"></i>';
        lucide.createIcons();
    }

    if (toggleDark) {
        toggleDark.addEventListener('click', () => {
            const isDark = document.body.classList.toggle('dark-theme');
            toggleDark.innerHTML = isDark
                ? '<i data-lucide="moon"></i>'
                : '<i data-lucide="sun"></i>';
            lucide.createIcons();
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }

    // =============================================
    // 4. NAVBAR: resaltar sección activa al scroll
    // =============================================
    const sections  = document.querySelectorAll('section[id]');
    const navLinks  = document.querySelectorAll('.nav-links a');

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(l => l.classList.remove('active'));
                const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
                if (active) active.classList.add('active');
            }
        });
    }, { threshold: 0.5 });

    sections.forEach(s => navObserver.observe(s));

    // =============================================
    // 5. WHATSAPP FORM
    // =============================================
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const nombre  = document.getElementById('wa-name').value;
            const email   = document.getElementById('wa-email').value;
            const mensaje = document.getElementById('wa-message').value;
            const tel     = '56926942030';
            const texto   = `*Nuevo contacto Portfolio*%0A*Nombre:* ${nombre}%0A*Email:* ${email}%0A*Mensaje:* ${mensaje}`;
            window.open(`https://wa.me/${tel}?text=${texto}`, '_blank');
        });
    }
});
