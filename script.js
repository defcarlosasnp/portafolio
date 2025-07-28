const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.querySelector('.nav-links');
menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});
const secciones = document.querySelectorAll('.section');
const observer = new window.IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
secciones.forEach(sec => observer.observe(sec));
const tarjetasExp = document.querySelectorAll('.experiencia-tarjeta');
const observerExp = new window.IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
tarjetasExp.forEach(tarjeta => observerExp.observe(tarjeta));
const filtroBtns = document.querySelectorAll('.filtro-btn');
const proyectos = document.querySelectorAll('.proyecto-card');
filtroBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filtroBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const tec = btn.getAttribute('data-tec');
    proyectos.forEach(card => {
      if (tec === 'todos' || card.getAttribute('data-tec').includes(tec)) {
        card.style.display = '';
        setTimeout(() => card.classList.add('visible'), 10);
      } else {
        card.classList.remove('visible');
        setTimeout(() => card.style.display = 'none', 300);
      }
    });
  });
});
const observerProy = new window.IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.13 });
proyectos.forEach(card => observerProy.observe(card));
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    let valido = true;
    form.classList.remove('success');
    const nombre = form.querySelector('#nombre');
    const grupoNombre = nombre.closest('.form-group');
    if (!nombre.value.trim()) {
      grupoNombre.classList.add('error');
      valido = false;
    } else {
      grupoNombre.classList.remove('error');
    }
    const correo = form.querySelector('#correo');
    const grupoCorreo = correo.closest('.form-group');
    const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.value);
    if (!correo.value.trim() || !correoValido) {
      grupoCorreo.classList.add('error');
      valido = false;
    } else {
      grupoCorreo.classList.remove('error');
    }
    const mensaje = form.querySelector('#mensaje');
    const grupoMensaje = mensaje.closest('.form-group');
    if (!mensaje.value.trim()) {
      grupoMensaje.classList.add('error');
      valido = false;
    } else {
      grupoMensaje.classList.remove('error');
    }
    if (valido) {
      form.classList.add('success');
      setTimeout(() => {
        form.classList.remove('success');
        form.reset();
      }, 2500);
    }
  });
}
const toggleDark = document.getElementById('toggle-dark');
if (toggleDark) {
  toggleDark.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    if (document.body.classList.contains('dark')) {
      toggleDark.textContent = '☀️';
    } else {
      toggleDark.textContent = '🌙';
    }
  });
} 