

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

// Menú lateral moderno (aunque está oculto, lo dejo por si lo reactivas)
const menuBtn = document.getElementById("menu-btn");
const sideMenu = document.getElementById("side-menu");

if (menuBtn && sideMenu) {
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
}

// Toggle para Servicios Legales
document.addEventListener("DOMContentLoaded", () => {
  const toggleBtnLegales = document.getElementById("toggle-servicios-legales");
  const containerLegales = document.getElementById("servicios-legales-container");
  let expandedLegales = false;

  const serviciosLegalesExtra = `
    <div class="col-md-4 servicio-extra">
      <div class="service-card p-4 bg-dark text-light rounded-4 shadow-lg h-100" data-service="consultoria-empresarial">
        <i class="fas fa-briefcase fa-3x text-gold mb-3"></i>
        <h4 class="fw-bold mb-2">Consultoría Empresarial</h4>
      </div>
    </div>
  `;

  if (toggleBtnLegales) {
    toggleBtnLegales.addEventListener("click", () => {
      if (!expandedLegales) {
        containerLegales.insertAdjacentHTML("beforeend", serviciosLegalesExtra);
        toggleBtnLegales.textContent = "Mostrar menos servicios legales";
        expandedLegales = true;
      } else {
        document.querySelectorAll("#servicios-legales-container .servicio-extra").forEach(el => el.remove());
        toggleBtnLegales.textContent = "Mostrar más servicios legales";
        expandedLegales = false;
      }
    });
  }
});


// Toggle para Servicios Arquitectónicos
document.addEventListener("DOMContentLoaded", () => {
  const toggleBtnArquitectonicos = document.getElementById("toggle-servicios-arquitectonicos");
  const containerArquitectonicos = document.getElementById("servicios-arquitectonicos-container");
  let expandedArquitectonicos = false;

  const serviciosArquitectonicosExtra = `
    <div class="col-md-4 servicio-extra">
      <div class="service-card p-4 bg-dark text-light rounded-4 shadow-lg h-100" data-service="peritaje-tecnico">
        <i class="fas fa-clipboard-check fa-3x text-gold mb-3"></i>
        <h4 class="fw-bold mb-2">Peritaje Técnico</h4>
      </div>
    </div>

    <div class="col-md-4 servicio-extra">
      <div class="service-card p-4 bg-dark text-light rounded-4 shadow-lg h-100" data-service="diseno-interior">
        <i class="fas fa-pencil-ruler fa-3x text-gold mb-3"></i>
        <h4 class="fw-bold mb-2">Diseño Interior</h4>
      </div>
    </div>
  `;

  if (toggleBtnArquitectonicos) {
    toggleBtnArquitectonicos.addEventListener("click", () => {
      if (!expandedArquitectonicos) {
        containerArquitectonicos.insertAdjacentHTML("beforeend", serviciosArquitectonicosExtra);
        toggleBtnArquitectonicos.textContent = "Mostrar menos servicios arquitectónicos";
        expandedArquitectonicos = true;
      } else {
        document.querySelectorAll("#servicios-arquitectonicos-container .servicio-extra").forEach(el => el.remove());
        toggleBtnArquitectonicos.textContent = "Mostrar más servicios arquitectónicos";
        expandedArquitectonicos = false;
      }
    });
  }
});

// Ajuste dinámico para la frase en Hero (móvil vs desktop)
document.addEventListener("DOMContentLoaded", function() {
  const frase = document.querySelector('.frase-hero');
  const right = document.querySelector('.right');
  
  function ajustarFrase() {
    if (window.innerWidth >= 992) { // Desktop (lg+)
      // Clona la frase y la mueve a la derecha
      const clonedFrase = frase.cloneNode(true);
      right.appendChild(clonedFrase);
      frase.style.display = 'none'; // Oculta la original en la izquierda
    } else { // Móvil
      // Asegura que la frase esté visible en la izquierda y limpia la derecha
      frase.style.display = 'block';
      right.innerHTML = ''; // Limpia cualquier clon anterior
    }
  }
  
  // Ejecuta al cargar
  ajustarFrase();
  
  // Re-ejecuta al redimensionar la ventana (opcional, por si cambian de móvil a desktop)
  window.addEventListener('resize', ajustarFrase);
});

// Redirigir a página de detalle al click en tarjeta (con event delegation para tarjetas dinámicas)
document.addEventListener("DOMContentLoaded", function() {
  document.addEventListener('click', function(e) {
    if (e.target.closest('.service-card')) {
      const card = e.target.closest('.service-card');
      const serviceId = card.getAttribute('data-service');
      if (serviceId) {
        window.location.href = `service-detail.html?service=${serviceId}`;
      }
    }
  });
});





