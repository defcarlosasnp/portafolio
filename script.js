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

    // 2. WHATSAPP
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nombre = document.getElementById('wa-name').value;
            const email = document.getElementById('wa-email').value;
            const mensaje = document.getElementById('wa-message').value;
            const telefono = "56926942030";

            const texto = `*Nuevo contacto Portfolio*%0A` +
                          `*Nombre:* ${nombre}%0A` +
                          `*Email:* ${email}%0A` +
                          `*Mensaje:* ${mensaje}`;

            const url = `https://wa.me/${telefono}?text=${texto}`;
            window.open(url, '_blank');
        });
    }

