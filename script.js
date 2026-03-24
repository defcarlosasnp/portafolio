const toggleDark = document.getElementById('toggle-dark');
toggleDark.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    toggleDark.innerHTML = isDark ? '<i data-lucide="sun"></i>' : '<i data-lucide="moon"></i>';
    lucide.createIcons(); // Recargar iconos
});
// Esperar a que todo el HTML cargue
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Evitar que la página se recargue o salte
            e.preventDefault();
            console.log("Formulario detectado, enviando...");

            // Capturar datos por ID
            const nombre = document.getElementById('wa-name').value;
            const email = document.getElementById('wa-email').value;
            const mensaje = document.getElementById('wa-message').value;

            const telefono = "56926942030";

            // Formatear mensaje para WhatsApp
            const texto = `*Nuevo contacto Portfolio*%0A` +
                          `*Nombre:* ${nombre}%0A` +
                          `*Email:* ${email}%0A` +
                          `*Mensaje:* ${mensaje}`;

            const url = `https://wa.me/${telefono}?text=${texto}`;

            // Abrir WhatsApp en pestaña nueva
            window.open(url, '_blank');
        });
    } else {
        console.error("No se encontró el formulario con ID 'contact-form'");
    }
});
