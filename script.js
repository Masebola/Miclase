// Navigation functionality
const menuBtn = document.getElementById("menuBtn");
const sideNav = document.getElementById("sideNav");
const navOverlay = document.getElementById("navOverlay");
const closeNav = document.getElementById("closeNav");

function openNavigation() {
  sideNav.classList.add("active");
  navOverlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeNavigation() {
  sideNav.classList.remove("active");
  navOverlay.classList.remove("active");
  document.body.style.overflow = "auto";
}

menuBtn.addEventListener("click", openNavigation);
closeNav.addEventListener("click", closeNavigation);
navOverlay.addEventListener("click", closeNavigation);

// Close navigation when clicking on a link (for mobile)
const navLinks = document.querySelectorAll(".nav-links a");
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (window.innerWidth <= 768) {
      closeNavigation();
    }
  });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

// Add fade-in class to elements and observe them
document.addEventListener("DOMContentLoaded", () => {
  const elementsToAnimate = document.querySelectorAll(
    ".skill-item, .project-card, .contact-item, .pricing-card, .service-item"
  );

  elementsToAnimate.forEach((el, index) => {
    el.classList.add("fade-in");
    el.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(el);
  });
});

// Header background on scroll
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header");
  if (window.scrollY > 100) {
    header.style.background = "rgba(15, 15, 35, 0.98)";
  } else {
    header.style.background = "rgba(15, 15, 35, 0.95)";
  }
});

// Typing effect for intro title (optional enhancement)
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = "";

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// Initialize typing effect on page load
document.addEventListener("DOMContentLoaded", () => {
  const introTitle = document.querySelector(".intro-title");
  if (introTitle) {
    const originalText = introTitle.textContent;
    // Uncomment the line below to enable typing effect
    // typeWriter(introTitle, originalText, 50);
  }
});

// Parallax effect for background elements
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll(".intro-section");

  parallaxElements.forEach((element) => {
    const speed = 0.5;
    element.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// Form validation (if you add contact forms later)
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Utility function to add glow effect on hover
function addGlowEffect(selector, glowColor) {
  const elements = document.querySelectorAll(selector);
  elements.forEach((element) => {
    element.addEventListener("mouseenter", () => {
      element.style.boxShadow = `0 0 20px ${glowColor}`;
    });

    element.addEventListener("mouseleave", () => {
      element.style.boxShadow = "";
    });
  });
}

// Initialize glow effects
document.addEventListener("DOMContentLoaded", () => {
  addGlowEffect(".btn-primary", "rgba(139, 92, 246, 0.5)");
  addGlowEffect(".skill-item", "rgba(139, 92, 246, 0.3)");
});

// Mobile menu improvements
function handleResize() {
  if (window.innerWidth > 768) {
    closeNavigation();
  }
}

window.addEventListener("resize", handleResize);

// Keyboard navigation support
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeNavigation();
  }
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply debounce to scroll events
const debouncedScrollHandler = debounce(() => {
  // Scroll-based animations or effects can go here
}, 10);

window.addEventListener("scroll", debouncedScrollHandler);
