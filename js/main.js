// ========= CONFIGURACIÓN =========
// 1) Reemplazá este número por el WhatsApp real de Paula (sin +, sin espacios, con 549):
//    Ejemplo: 5491123456789
const WHATSAPP_NUMBER = "542204085348";

// Mensaje base para el botón flotante:
const WA_FLOAT_MESSAGE = "Hola! Quiero consultar y reservar un turno en Virtuosas Beauty ✨";

// ========= UTIL =========
function buildWaLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

// ========= Año footer =========
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ========= Botón flotante WhatsApp =========
const waFloat = document.getElementById("waFloat");
if (waFloat) {
  waFloat.href = buildWaLink(WA_FLOAT_MESSAGE);
  waFloat.target = "_blank";
  waFloat.rel = "noopener";
}

// ========= Modal Galería =========
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const modalClose = document.getElementById("modalClose");

if (modal && modalImg) {
  const imgs = document.querySelectorAll(".gallery img");
  imgs.forEach((img) => {
    img.addEventListener("click", () => {
      modal.classList.add("active");
      modalImg.src = img.dataset.full || img.src;
      document.body.style.overflow = "hidden";
    });
  });

  const closeModal = () => {
    modal.classList.remove("active");
    modalImg.src = "";
    document.body.style.overflow = "";
  };

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  if (modalClose) modalClose.addEventListener("click", closeModal);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) closeModal();
  });
}

// ========= Turnos: formulario a WhatsApp =========
const form = document.getElementById("formTurno");
if (form) {
  // Set min date = hoy
  const dateInput = document.getElementById("fecha");
  if (dateInput) {
    const today = new Date();
    const yyyy = String(today.getFullYear());
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    dateInput.min = `${yyyy}-${mm}-${dd}`;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre")?.value.trim();
    const telefono = document.getElementById("telefono")?.value.trim();
    const servicio = document.getElementById("servicio")?.value;
    const fecha = document.getElementById("fecha")?.value;
    const hora = document.getElementById("hora")?.value;
    const lugar = document.getElementById("lugar")?.value;
    const zona = document.getElementById("zona")?.value.trim();
    const comentarios = document.getElementById("comentarios")?.value.trim();

    if (!nombre || !telefono || !servicio || !fecha || !hora || !lugar) {
      alert("Por favor completá los campos obligatorios.");
      return;
    }

    const extraZona = lugar.includes("Domicilio") ? `\nZona: ${zona || "No especificada"}` : "";

    const msg =
`Hola! Quiero reservar un turno en Virtuosas Beauty 💇‍♀️✨

Nombre: ${nombre}
Mi WhatsApp: ${telefono}
Servicio: ${servicio}
Fecha: ${fecha}
Hora aprox: ${hora}
Lugar: ${lugar}${extraZona}
Comentarios: ${comentarios || "Sin comentarios"}

Quedo a la espera para coordinar la seña.`;

    // Si todavía no cambiaste el número, avisamos:
    if (WHATSAPP_NUMBER.includes("X")) {
      alert("Te falta configurar el número de WhatsApp en js/main.js (WHATSAPP_NUMBER).");
      return;
    }

    window.open(buildWaLink(msg), "_blank", "noopener");
  });
}
