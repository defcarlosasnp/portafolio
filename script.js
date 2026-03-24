const toggleDark = document.getElementById('toggle-dark');
toggleDark.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    toggleDark.innerHTML = isDark ? '<i data-lucide="sun"></i>' : '<i data-lucide="moon"></i>';
    lucide.createIcons(); // Recargar iconos
});
const form = document.getElementById('contact-form');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Capturamos los datos
    const nombre = form.querySelector('input[type="text"]').value;
    const email = form.querySelector('input[type="email"]').value;
    const mensaje = form.querySelector('textarea').value;
    
    // Tu número de teléfono (sin el +)
    const telefono = "56926942030";
    
    // Creamos el mensaje codificado para URL
    const texto = `Hola Carlos, mi nombre es ${nombre} (${email}). ${mensaje}`;
    const url = `https://wa.me/${telefono}?text=${encodeURIComponent(texto)}`;
    
    // Abrimos WhatsApp
    window.open(url, '_blank');
});
