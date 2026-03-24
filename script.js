document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();

    // 1. ANIMACIÓN DE REVELADO AL HACER SCROLL
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // 2. MODO OSCURO
    const toggleDark = document.getElementById('toggle-dark');
    if (toggleDark) {
        toggleDark.addEventListener('click', () => {
            document.body.classList.toggle('dark');
            const isDark = document.body.classList.contains('dark');
            toggleDark.innerHTML = isDark ? '<i data-lucide="sun"></i>' : '<i data-lucide="moon"></i>';
            lucide.createIcons();
        });
    }

    // 3. WHATSAPP FORM
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
