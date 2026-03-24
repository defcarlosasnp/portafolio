document.addEventListener('DOMContentLoaded', () => {
    // Inicializar iconos
    lucide.createIcons();

    // 1. MODO OSCURO
    const toggleDark = document.getElementById('toggle-dark');
    if (toggleDark) {
        toggleDark.addEventListener('click', () => {
            document.body.classList.toggle('dark');
            const isDark = document.body.classList.contains('dark');
            toggleDark.innerHTML = isDark ? '<i data-lucide="sun"></i>' : '<i data-lucide="moon"></i>';
            lucide.createIcons(); 
        });
    }



    // --- ANIMACIÓN DE REVELADO (SCROLL) ---
    const reveal = () => {
        const reveals = document.querySelectorAll('.reveal');
        reveals.forEach(el => {
            const windowHeight = window.innerHeight;
            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 150;
            if (elementTop < windowHeight - elementVisible) {
                el.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', reveal);
    reveal(); // Ejecutar una vez al cargar

    // --- MODO OSCURO ---
    const toggleDark = document.getElementById('toggle-dark');
    if (toggleDark) {
        toggleDark.addEventListener('click', () => {
            document.body.classList.toggle('dark');
            const isDark = document.body.classList.contains('dark');
            toggleDark.innerHTML = isDark ? '<i data-lucide="sun"></i>' : '<i data-lucide="moon"></i>';
            lucide.createIcons();
        });
    }

    // --- WHATSAPP ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const nombre = document.getElementById('wa-name').value;
            const email = document.getElementById('wa-email').value;
            const mensaje = document.getElementById('wa-message').value;
            const telefono = "56926942030";
            const texto = `*Nuevo contacto Portfolio*%0A*Nombre:* ${nombre}%0A*Email:* ${email}%0A*Mensaje:* ${mensaje}`;
            window.open(`https://wa.me/${telefono}?text=${texto}`, '_blank');
        });
    }
});
