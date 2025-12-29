// Mobile navigation toggle
const navToggle = document.getElementById("navToggle");
const mainNav = document.getElementById("mainNav");

if (navToggle && mainNav) {
  navToggle.addEventListener("click", () => {
    mainNav.classList.toggle("open");
  });

  // Close menu when a link is clicked (mobile)
  mainNav.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      mainNav.classList.remove("open");
    }
  });
}

// Simple counter animation for stats
const statNumbers = document.querySelectorAll(".stat-number");

function animateStats() {
  statNumbers.forEach((el) => {
    const target = Number(el.dataset.target || "0");
    const duration = 1000; // ms
    const start = 0;
    const startTime = performance.now();

    function update(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const current = Math.floor(start + (target - start) * progress);
      el.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  });
}

// Trigger animation when hero is visible
const heroSection = document.querySelector(".hero");
if (heroSection && statNumbers.length) {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateStats();
          obs.disconnect();
        }
      });
    },
    { threshold: 0.4 }
  );

  observer.observe(heroSection);
}

// Simple mailto handler for contact form (works without a backend)
const contactForm = document.querySelector(".contact-form");
const formStatus = document.getElementById("formStatus");

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const name = (formData.get("name") || "").toString().trim();
    const email = (formData.get("email") || "").toString().trim();
    const message = (formData.get("message") || "").toString().trim();

    if (!name || !email || !message) {
      formStatus.textContent = "Please complete all fields before sending.";
      return;
    }

    const subject = `New contact from ${name}`;
    const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
    const mailto = `mailto:thomsjulian@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    formStatus.textContent = "Opening your email client...";
    window.location.href = mailto;
    setTimeout(() => {
      formStatus.textContent = "If your email client didn't open, please email me directly.";
    }, 1200);
  });
}
