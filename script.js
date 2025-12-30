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

// Toggle para Servicios Legales (solo este, con las nuevas tarjetas)
document.addEventListener("DOMContentLoaded", () => {
  const toggleBtnLegales = document.getElementById("toggle-servicios-legales");
  const containerLegales = document.getElementById("servicios-legales-container");
  let expandedLegales = false;

  const serviciosLegalesExtra = `
    <div class="col-md-4 servicio-extra">
      <div class="service-card p-4 bg-dark text-light rounded-4 shadow-lg h-100" data-service="junta-propietarios">
        <i class="fas fa-users fa-3x text-gold mb-3"></i>
        <h4 class="fw-bold mb-2">Junta de Propietarios</h4>
      </div>
    </div>

    <div class="col-md-4 servicio-extra">
      <div class="service-card p-4 bg-dark text-light rounded-4 shadow-lg h-100" data-service="formalizacion-legalizacion">
        <i class="fas fa-file-signature fa-3x text-gold mb-3"></i>
        <h4 class="fw-bold mb-2">Formalización y Legalización de Edificaciones</h4>
      </div>
    </div>

    <div class="col-md-4 servicio-extra">
      <div class="service-card p-4 bg-dark text-light rounded-4 shadow-lg h-100" data-service="saneamiento-fisico-legal">
        <i class="fas fa-home fa-3x text-gold mb-3"></i>
        <h4 class="fw-bold mb-2">Saneamiento físico legal de inmuebles y proyectos</h4>
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
        window.location.href = `${serviceId}.html`; // Redirige a página específica (ej. asesoria-legal.html)
      }
    }
  });
});

// FORMULARIO DE CONTACTO - POPUP DE CONFIRMACIÓN Y ERRORES
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".contact-form");
  const popup = document.getElementById("popup-confirmacion");

  if (form && popup) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      // Validaciones
      const nombre = form.querySelector('input[name="nombre"]').value.trim();
      const correo = form.querySelector('input[name="email"]').value.trim();
      const mensaje = form.querySelector('textarea[name="mensaje"]').value.trim();

      if (nombre.length === 0 || nombre.length > 50) {
        mostrarPopupError(" El nombre debe tener entre 1 y 50 caracteres.");
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(correo)) {
        mostrarPopupError("Ingresa un correo electrónico válido.");
        return;
      }

      if (mensaje.length === 0 || mensaje.length > 500) {
        mostrarPopupError(" El mensaje debe tener entre 1 y 500 caracteres.");
        return;
      }

      // Envío con Formspree
      try {
        const response = await fetch(form.action, {
          method: form.method,
          body: new FormData(form),
          headers: { Accept: "application/json" },
        });

        if (response.ok) {
          mostrarPopupExito(); // Mostrar popup de éxito
          form.reset();
        } else {
          mostrarPopupError("Ocurrió un error al enviar el mensaje. Intenta nuevamente.");
        }
      } catch (error) {
        mostrarPopupError(" Error de conexión. Verifica tu internet e intenta otra vez.");
      }
    });
  }

  // -------- POPUP DE ÉXITO --------
  function mostrarPopupExito() {
    popup.classList.remove("error"); // Asegura que no tenga clase de error
    popup.classList.add("activo");
    popup.querySelector(".icono").className = "fas fa-paper-plane icono"; // Ícono de éxito
    popup.querySelector(".mensaje-texto").textContent = "¡Gracias por contactarnos! Tu mensaje fue enviado correctamente.";

    // Oculta el popup después de 5 segundos
    setTimeout(() => {
      popup.classList.remove("activo");
    }, 2000);
  }

  // -------- POPUP DE ERROR --------
  function mostrarPopupError(mensaje) {
    popup.classList.add("error"); // Agrega clase para estilos de error
    popup.classList.add("activo");
    popup.querySelector(".icono").className = "fas fa-exclamation-triangle icono"; // Ícono de error
    popup.querySelector(".mensaje-texto").textContent = mensaje;

    // Oculta el popup después de 5 segundos
    setTimeout(() => {
      popup.classList.remove("activo", "error");
    }, 2000);
  }
});

// Redirigir al click en ítems de servicios arquitectónicos
document.addEventListener("DOMContentLoaded", function() {
  document.addEventListener('click', function(e) {
    if (e.target.closest('.service-item-arq')) {
      const item = e.target.closest('.service-item-arq');
      const serviceId = item.getAttribute('data-service');
      if (serviceId) {
        window.location.href = `${serviceId}.html`; // Redirige a página específica
      }
    }
  });
});

// Toggle para Servicios Arquitectónicos
document.addEventListener("DOMContentLoaded", () => {
  const toggleBtnArquitectonicos = document.getElementById("toggle-servicios-arquitectonicos");
  const containerArquitectonicos = document.getElementById("servicios-arquitectonicos-container");
  let expandedArquitectonicos = false;

  const serviciosArquitectonicosExtra = `
    <div class="col-md-4 servicio-extra">
      <div class="service-card p-4 bg-dark text-light rounded-4 shadow-lg h-100" data-service="supervision-gestion">
        <i class="fas fa-hammer fa-3x text-gold mb-3"></i>
        <h4 class="fw-bold mb-2 text-gold">Supervisión y Gestión de Proyectos</h4>
      </div>
    </div>

    <div class="col-md-4 servicio-extra">
      <div class="service-card p-4 bg-dark text-light rounded-4 shadow-lg h-100" data-service="arquitectura-interior">
        <i class="fas fa-pencil-ruler fa-3x text-gold mb-3"></i>
        <h4 class="fw-bold mb-2 text-gold">Arquitectura Interior y Remodelaciones</h4>
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
