// EdgeLedger Main JavaScript
document.addEventListener("DOMContentLoaded", function () {
  // ========== HAMBURGER MENU ==========
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");
  const navbar = document.getElementById("js-navbar");

  // Create overlay element for mobile menu
  const overlay = document.createElement("div");
  overlay.className = "overlay";
  document.body.appendChild(overlay);

  // Initialize menu based on screen width
  function initializeMenu() {
    if (window.innerWidth <= 780) {
      // Mobile: Add mobile-active class and hide menu
      navMenu.classList.add("mobile-active");
      navMenu.classList.remove("active");
      hamburger.classList.remove("active");
      overlay.classList.remove("active");
    } else {
      // Desktop: Remove mobile classes
      navMenu.classList.remove("mobile-active");
      navMenu.classList.remove("active");
      hamburger.classList.remove("active");
      overlay.classList.remove("active");
    }
  }

  // Call initialize on load
  initializeMenu();

  // Toggle mobile menu
  function toggleMenu() {
    if (window.innerWidth <= 780) {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
      overlay.classList.toggle("active");

      // Prevent body scroll when menu is open
      if (navMenu.classList.contains("active")) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    }
  }

  // Close mobile menu
  function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
    overlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  // Hamburger click event
  hamburger.addEventListener("click", function (e) {
    e.stopPropagation();
    toggleMenu();
  });

  // Overlay click event (close menu)
  overlay.addEventListener("click", closeMenu);

  // Close menu when clicking outside on mobile
  document.addEventListener("click", function (e) {
    if (
      window.innerWidth <= 780 &&
      navMenu.classList.contains("active") &&
      !navMenu.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      closeMenu();
    }
  });

  // Close menu with Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && navMenu.classList.contains("active")) {
      closeMenu();
    }
  });

  // ========== SMOOTH SCROLLING ==========
  function smoothScroll(e) {
    const href = this.getAttribute("href");

    // Only handle internal links
    if (href.startsWith("#")) {
      e.preventDefault();

      // Get target element
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        // Close mobile menu if open
        if (window.innerWidth <= 780 && navMenu.classList.contains("active")) {
          closeMenu();
        }

        // Calculate scroll position (account for navbar height)
        const navbarHeight = navbar.offsetHeight;
        let targetPosition;

        if (targetId === "home") {
          targetPosition = 0;
        } else {
          targetPosition = targetElement.offsetTop - navbarHeight;
        }

        // Smooth scroll to target
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    }
  }

  // Apply smooth scroll to all navigation links
  const navLinks = document.querySelectorAll("#nav-menu a");
  navLinks.forEach((link) => {
    link.addEventListener("click", smoothScroll);
  });

  // ========== NAVBAR SCROLL EFFECT ==========
  function handleScroll() {
    if (window.scrollY > 100) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", handleScroll);

  // ========== FORM SUBMISSION ==========
  const contactForm = document.querySelector(".callback-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form values
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const phone = document.getElementById("phone").value;

      // Simple validation
      if (!name || !email || !phone) {
        alert("Please fill in all fields");
        return;
      }

      // Simulate form submission
      const submitBtn = document.getElementById("submit");
      const originalText = submitBtn.value;

      submitBtn.value = "Sending...";
      submitBtn.disabled = true;

      // Simulate API call
      setTimeout(() => {
        alert(
          `Thank you ${name}! We will contact you at ${email} or ${phone} within 24 hours.`
        );
        contactForm.reset();
        submitBtn.value = originalText;
        submitBtn.disabled = false;
      }, 1500);
    });
  }

  // ========== IMAGE LAZY LOADING ==========
  function lazyLoadImages() {
    const images = document.querySelectorAll("img");

    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.style.opacity = "1";
          img.style.transform = "translateY(0)";
          observer.unobserve(img);
        }
      });
    });

    images.forEach((img) => {
      img.style.opacity = "0";
      img.style.transform = "translateY(20px)";
      img.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      imageObserver.observe(img);
    });
  }

  // Initialize lazy loading
  lazyLoadImages();

  // ========== HANDLE WINDOW RESIZE ==========
  let resizeTimeout;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimeout);

    resizeTimeout = setTimeout(() => {
      initializeMenu();
      lazyLoadImages();
    }, 250);
  });

  // ========== INITIALIZE ANIMATIONS ==========
  // Add fade-in class to elements on scroll
  const animateOnScroll = function () {
    const elements = document.querySelectorAll(
      ".icons .flex-items > div, .section-header, .team .flex-items > div"
    );

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.2;

      if (elementPosition < screenPosition) {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }
    });
  };

  // Set initial styles for animated elements
  const animatedElements = document.querySelectorAll(
    ".icons .flex-items > div, .section-header, .team .flex-items > div"
  );
  animatedElements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";
    element.style.transition = "opacity 0.8s ease, transform 0.8s ease";
  });

  // Run animation check on scroll
  window.addEventListener("scroll", animateOnScroll);

  // Run once on load
  setTimeout(animateOnScroll, 300);

  // ========== CONSOLE MESSAGE ==========
  console.log(
    "%c🚀 EdgeLedger Loaded Successfully!",
    "color: #28a745; font-size: 16px; font-weight: bold;"
  );
  console.log(
    "%cHamburger menu working on mobile (< 780px)",
    "color: #0284d0;"
  );
});
