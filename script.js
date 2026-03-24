// Inicializar iconos de Lucide
lucide.createIcons();

// Efecto de scroll en el header
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.padding = '0.5rem 0';
        header.style.boxShadow = '0 10px 15px -3px rgba(0,0,0,0.1)';
    } else {
        header.style.padding = '1rem 0';
        header.style.boxShadow = 'none';
    }
});
