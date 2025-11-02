// Resalta el enlace activo al hacer scroll
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    if (scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });
});

// Scroll suave en la navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Inicializar animaciones con AOS
document.addEventListener("DOMContentLoaded", function() {
  AOS.init({
    duration: 1000,
    once: true
  });
});


// Loader animado antes de mostrar la web
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  document.body.classList.add("loaded"); // activa animaciones suaves
  loader.classList.add("fade-out");

  // Elimina el loader del DOM después de la animación
  setTimeout(() => {
    loader.style.display = "none";
  }, 1000);
});

// Menú lateral moderno
const menuBtn = document.getElementById("menu-btn");
const sideMenu = document.getElementById("side-menu");

menuBtn.addEventListener("click", () => {
  menuBtn.classList.toggle("active");
  sideMenu.classList.toggle("active");
});

// Cierra el menú al hacer clic en un enlace
document.querySelectorAll(".side-menu a").forEach(link => {
  link.addEventListener("click", () => {
    menuBtn.classList.remove("active");
    sideMenu.classList.remove("active");
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("toggle-servicios");
  const container = document.getElementById("servicios-container");
  let expanded = false;

  const serviciosExtra = `
    <div class="col-md-4 servicio-extra">
      <div class="service-card p-4 bg-dark text-light rounded-4 shadow-lg h-100">
        <i class="fas fa-hammer fa-3x text-gold mb-3"></i>
        <h4 class="fw-bold mb-2">Supervisión de Obra</h4>
        <p>Control técnico y administrativo para asegurar calidad y cumplimiento de plazos en tu proyecto.</p>
      </div>
    </div>

    <div class="col-md-4 servicio-extra">
      <div class="service-card p-4 bg-dark text-light rounded-4 shadow-lg h-100">
        <i class="fas fa-clipboard-check fa-3x text-gold mb-3"></i>
        <h4 class="fw-bold mb-2">Peritaje Técnico</h4>
        <p>Evaluaciones especializadas para resolver conflictos o validar estructuras y edificaciones.</p>
      </div>
    </div>

    <div class="col-md-4 servicio-extra">
      <div class="service-card p-4 bg-dark text-light rounded-4 shadow-lg h-100">
        <i class="fas fa-landmark fa-3x text-gold mb-3"></i>
        <h4 class="fw-bold mb-2">Regularización de Inmuebles</h4>
        <p>Formaliza y sanea tu propiedad para garantizar su inscripción legal y valorización.</p>
      </div>
    </div>

    <div class="col-md-4 servicio-extra">
      <div class="service-card p-4 bg-dark text-light rounded-4 shadow-lg h-100">
        <i class="fas fa-briefcase fa-3x text-gold mb-3"></i>
        <h4 class="fw-bold mb-2">Consultoría Empresarial</h4>
        <p>Asesoramos tu empresa en temas legales, técnicos y de inversión inmobiliaria.</p>
      </div>
    </div>

    <div class="col-md-4 servicio-extra">
      <div class="service-card p-4 bg-dark text-light rounded-4 shadow-lg h-100">
        <i class="fas fa-users fa-3x text-gold mb-3"></i>
        <h4 class="fw-bold mb-2">Gestión de Proyectos</h4>
        <p>Planificamos y dirigimos tu proyecto desde la idea inicial hasta su ejecución final.</p>
      </div>
    </div>

    <div class="col-md-4 servicio-extra">
      <div class="service-card p-4 bg-dark text-light rounded-4 shadow-lg h-100">
        <i class="fas fa-pencil-ruler fa-3x text-gold mb-3"></i>
        <h4 class="fw-bold mb-2">Diseño Interior</h4>
        <p>Espacios armónicos y funcionales con identidad estética y confort moderno.</p>
      </div>
    </div>
  `;

  toggleBtn.addEventListener("click", () => {
    if (!expanded) {
      container.insertAdjacentHTML("beforeend", serviciosExtra);
      toggleBtn.textContent = "Mostrar menos servicios";
      expanded = true;
    } else {
      document.querySelectorAll(".servicio-extra").forEach(el => el.remove());
      toggleBtn.textContent = "Mostrar más servicios";
      expanded = false;
    }
  });
});
