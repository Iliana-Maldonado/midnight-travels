/* ======================================================
   GLOBAL INTERACTIONS - Midnight Travels
   ====================================================== */

// --- NAVBAR SCROLL EFFECT ---
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (navbar) {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }
});

/* ======================================================
   BUTTONS (LOGGING OR BASIC INTERACTIVITY)
   ====================================================== */
document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    console.log(`Button clicked: ${btn.textContent.trim()}`);
  });
});

/* ======================================================
   HERO CAROUSEL (Home Page only)
   ====================================================== */
const heroCarouselEl = document.getElementById("heroCarousel");
if (heroCarouselEl) {
  const heroCarousel = bootstrap.Carousel.getOrCreateInstance("#heroCarousel");
  const destinationItems = document.querySelectorAll(".destination-item");
  const heroTitle = document.getElementById("heroTitle");

  // Cambiar de slide al hacer clic en destino lateral
  destinationItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      heroCarousel.to(index);
      destinationItems.forEach((el) => el.classList.remove("active"));
      item.classList.add("active");
    });
  });

  // Cambiar texto del hero al cambiar imagen
  heroCarouselEl.addEventListener("slid.bs.carousel", (e) => {
    const activeItem = e.relatedTarget;
    const title = activeItem.getAttribute("data-title");
    if (heroTitle) heroTitle.textContent = title;

    destinationItems.forEach((el) => el.classList.remove("active"));
    if (destinationItems[e.to]) destinationItems[e.to].classList.add("active");
  });
}

/* ======================================================
   GUEST SELECTOR (Search Section)
   ====================================================== */
const guestDropdown = document.getElementById("guestDropdown");
const guestOptions = document.getElementById("guestOptions");
const guestSummary = document.getElementById("guestSummary");

if (guestDropdown && guestOptions && guestSummary) {
  let guests = { adults: 2, children: 0, pets: 0 };

  // Show / hide dropdown
  guestDropdown.addEventListener("click", () => {
    guestOptions.classList.toggle("show");
  });

  // Buttons + y -
  document.querySelectorAll(".guest-btn").forEach((button) => {
    button.addEventListener("click", (e) => {
      const type = e.target.dataset.type;
      const action = e.target.dataset.action;

      if (action === "plus") guests[type]++;
      if (action === "minus" && guests[type] > 0) guests[type]--;

      // Actualizar los contadores individuales
      document.getElementById(`${type}Count`).textContent = guests[type];

      // Actualizar resumen visible
      guestSummary.textContent = `${guests.adults} adults, ${guests.children} children, ${guests.pets} pets`;
    });
  });

  // Cerrar dropdown al hacer clic fuera
  document.addEventListener("click", (e) => {
    if (
      !guestDropdown.contains(e.target) &&
      !guestOptions.contains(e.target)
    ) {
      guestOptions.classList.remove("show");
    }
  });
}

/* ======================================================
   DESTINATIONS IMAGE HOVER EFFECT
   ====================================================== */
document.querySelectorAll(".destination-card img").forEach((img) => {
  const original = img.src;
  const altImg = img.getAttribute("data-alt");

  if (!altImg) return;

  img.addEventListener("mouseenter", () => {
    img.src = altImg;
  });

  img.addEventListener("mouseleave", () => {
    img.src = original;
  });
});

/* ======================================================
   SHOW MORE / SHOW LESS (Best Destinations)
   ====================================================== */
const showMoreDestinations = document.getElementById("showMoreDestinations");
const extraDestinations = document.getElementById("extraDestinations");
let showingDestinations = false;

if (showMoreDestinations && extraDestinations) {
  showMoreDestinations.addEventListener("click", () => {
    showingDestinations = !showingDestinations;
    if (showingDestinations) {
      extraDestinations.classList.remove("d-none");
      extraDestinations.classList.add("fade-in");
      showMoreDestinations.textContent = "See Less";
    } else {
      extraDestinations.classList.add("d-none");
      showMoreDestinations.textContent = "See More";
    }
  });
}

/* ======================================================
   SCROLL REVEAL (Optional - Add AOS)
   ====================================================== */
if (typeof AOS !== "undefined") {
  AOS.init({
    duration: 800,
    once: true,
  });
}

console.log(" Script.js loaded successfully!");

// --- Contact Modern Form ---
const contactFormModern = document.getElementById("contactFormModern");

if (contactFormModern) {
  contactFormModern.addEventListener("submit", e => {
    e.preventDefault();
    alert("Thanks for contacting us! An agent will reach out shortly.");
    contactFormModern.reset();
  });
}

// --- Booking Modal Functionality ---
document.addEventListener("DOMContentLoaded", () => {
  const bookingModal = document.getElementById('bookingModal');
  const destinationInput = document.getElementById('destination');

  document.querySelectorAll('.book-btn').forEach(button => {
    button.addEventListener('click', e => {
      e.preventDefault();
      const destination = button.getAttribute('data-destination');
      destinationInput.value = destination;
      const modal = new bootstrap.Modal(bookingModal);
      modal.show();
    });
  });

  // Message 
  const form = document.getElementById('bookingForm');
  form.addEventListener('submit', e => {
    e.preventDefault();
    alert('✨ Your booking has been received! We will contact you soon with payment details ✈️');
    bootstrap.Modal.getInstance(bookingModal).hide();
    form.reset();
  });
});
