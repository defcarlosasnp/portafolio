// Menú móvil mejorado
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  // Cambiar el ícono del menú
  const spans = menuToggle.querySelectorAll('span');
  if (navLinks.classList.contains('active')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
  } else {
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
  }
});

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    // Restaurar ícono del menú
    const spans = menuToggle.querySelectorAll('span');
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
  });
});

// Cerrar menú al hacer clic fuera de él
document.addEventListener('click', (e) => {
  if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
    navLinks.classList.remove('active');
    const spans = menuToggle.querySelectorAll('span');
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
  }
});

// Scroll suave mejorado
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      const headerHeight = document.querySelector('header').offsetHeight;
      const targetPosition = targetElement.offsetTop - headerHeight - 20;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Observador de intersección para animaciones
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

// Observador para tarjetas de experiencia
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

// Filtros de proyectos
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

// Observador para proyectos
const observerProy = new window.IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.13 });

proyectos.forEach(card => observerProy.observe(card));

// Formulario de contacto
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    let valido = true;
    form.classList.remove('success');
    
    // Validar nombre
    const nombre = form.querySelector('#nombre');
    const grupoNombre = nombre.closest('.form-group');
    if (!nombre.value.trim()) {
      grupoNombre.classList.add('error');
      valido = false;
    } else {
      grupoNombre.classList.remove('error');
    }
    
    // Validar correo
    const correo = form.querySelector('#correo');
    const grupoCorreo = correo.closest('.form-group');
    const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.value);
    if (!correo.value.trim() || !correoValido) {
      grupoCorreo.classList.add('error');
      valido = false;
    } else {
      grupoCorreo.classList.remove('error');
    }
    
    // Validar mensaje
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

// Modo oscuro
const toggleDark = document.getElementById('toggle-dark');
if (toggleDark) {
  // Verificar si hay preferencia guardada
  const darkMode = localStorage.getItem('darkMode');
  if (darkMode === 'true') {
    document.body.classList.add('dark');
    toggleDark.textContent = '☀️';
  }
  
  toggleDark.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    
    if (isDark) {
      toggleDark.textContent = '☀️';
      localStorage.setItem('darkMode', 'true');
    } else {
      toggleDark.textContent = '🌙';
      localStorage.setItem('darkMode', 'false');
    }
  });
}

// Mejoras de rendimiento para móviles
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    // Ajustar altura de secciones en móviles
    if (window.innerWidth <= 768) {
      document.querySelectorAll('.section').forEach(section => {
        section.style.minHeight = 'auto';
      });
    } else {
      document.querySelectorAll('.section').forEach(section => {
        section.style.minHeight = '100vh';
      });
    }
  }, 250);
});

// Prevenir zoom en inputs en iOS
if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
  document.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('focus', () => {
      input.style.fontSize = '16px';
    });
  });
}

// Lazy loading para imágenes
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
} 
