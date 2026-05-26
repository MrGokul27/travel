document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // 1. PAGE PRELOADER DISMISS
  // ==========================================
  const dismissPreloader = () => {
    const preloader = document.querySelector(".preloader");
    if (preloader) {
      preloader.classList.add("fade-out");
      setTimeout(() => {
        preloader.remove();
      }, 800);
    }
  };

  // ==========================================
  // 2. DYNAMIC COMPONENT LOADER
  // ==========================================
  const loadComponent = async (id, filePath, callback) => {
    try {
      const response = await fetch(filePath);
      const content = response.ok ? await response.text() : "";
      const element = document.getElementById(id);
      if (element) {
        element.innerHTML = content;
      }
      if (callback) callback();
    } catch (error) {
      console.error(`Error loading component ${filePath}:`, error);
      if (callback) callback();
    }
  };

  // ==========================================
  // 3. STICKY HEADER INTERACTION
  // ==========================================
  const initStickyHeader = () => {
    const header = document.querySelector(".header-area");
    if (header) {
      const checkScroll = () => {
        if (window.scrollY > 80) {
          header.classList.add("sticky");
        } else {
          header.classList.remove("sticky");
        }
      };

      window.addEventListener("scroll", checkScroll);
      checkScroll(); // Initial check
    }
  };

  // ==========================================
  // 4. TOUR SLIDER INITIALIZATION
  // ==========================================
  const initTourSlider = () => {
    const tourSlider = document.querySelector(".tour-slider");
    if (tourSlider && typeof Swiper !== "undefined") {
      const slideCount = tourSlider.querySelectorAll(".swiper-slide").length;
      new Swiper(".tour-slider", {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: slideCount > 3,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        breakpoints: {
          768: { slidesPerView: 2 },
          1200: { slidesPerView: 3 },
        },
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
      });
    }
  };

  // ==========================================
  // 4.5 DESTINATION SLIDER INITIALIZATION
  // ==========================================
  const initDestinationSlider = () => {
    const destSlider = document.querySelector(".destination-slider");
    if (destSlider && typeof Swiper !== "undefined") {
      const slideCount = destSlider.querySelectorAll(".swiper-slide").length;
      new Swiper(".destination-slider", {
        slidesPerView: 1,
        spaceBetween: 24,
        loop: slideCount > 4,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        breakpoints: {
          576: { slidesPerView: 2 },
          992: { slidesPerView: 3 },
          1200: { slidesPerView: 4 },
        },
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
      });
    }
  };

  // ==========================================
  // 4.6 CLIENTS SLIDER INITIALIZATION
  // ==========================================
  const initClientsSlider = () => {
    const clientsSlider = document.querySelector(".clients-slider");
    if (clientsSlider && typeof Swiper !== "undefined") {
      const slideCount = clientsSlider.querySelectorAll(".swiper-slide").length;
      new Swiper(".clients-slider", {
        slidesPerView: 2,
        spaceBetween: 30,
        loop: slideCount > 6,
        autoplay: {
          delay: 2000,
          disableOnInteraction: false,
        },
        breakpoints: {
          576: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          992: { slidesPerView: 5 },
          1200: { slidesPerView: 6 },
        },
      });
    }
  };

  // ==========================================
  // 4.7 GALLERY SLIDER INITIALIZATION
  // ==========================================
  const initGallerySlider = () => {
    const gallerySlider = document.querySelector(".gallery-slider");

    if (gallerySlider && typeof Swiper !== "undefined") {
      const slideCount = gallerySlider.querySelectorAll(".swiper-slide").length;
      new Swiper(".gallery-slider", {
        slidesPerView: 1,
        spaceBetween: 24,
        loop: slideCount > 4,
        grabCursor: true,
        speed: 5000,

        autoplay: {
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        },

        breakpoints: {
          576: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1200: {
            slidesPerView: 4,
          },
        },
      });
    }
  };

  // ==========================================
  // 4.7 ACTIVE NAVIGATION LINK
  // ==========================================
  const initActiveMenuLink = () => {
    const url = window.location.pathname;
    const filename = url.substring(url.lastIndexOf("/") + 1) || "index.html";

    const menuLinks = document.querySelectorAll(".main-menu a");
    menuLinks.forEach((link) => {
      const href = link.getAttribute("href");
      if (href && href === filename) {
        link.parentElement.classList.add("current-page");
      }
    });
  };

  // ==========================================
  // 5. INTERACTIVE OFFCANVAS DRAWER & RESPONSIVE NAVIGATION
  // ==========================================
  const initMenuAndDrawer = () => {
    // A. Elements
    const offcanvasDrawer = document.getElementById("tripex-offcanvas-drawer");
    const gridTrigger = document.getElementById("offcanvas-grid-trigger");
    const closeTrigger = document.getElementById("offcanvas-close-trigger");
    const overlay = document.getElementById("mobile-menu-overlay");

    const mobileMenuTrigger = document.getElementById(
      "mobile-hamburger-trigger",
    );
    const mobileMenuClose = document.querySelector(".navbar-close");
    const navMenuDrawer = document.querySelector(".theme-nav-menu");

    // Helper: Close all panels
    const closeAllPanels = () => {
      offcanvasDrawer?.classList.remove("active");
      navMenuDrawer?.classList.remove("active");
      overlay?.classList.remove("active");
    };

    // B. Offcanvas Sidebar (9-dots trigger)
    if (gridTrigger && offcanvasDrawer && overlay) {
      gridTrigger.addEventListener("click", (e) => {
        e.stopPropagation();
        closeAllPanels();
        offcanvasDrawer.classList.add("active");
        overlay.classList.add("active");
      });
    }

    if (closeTrigger) {
      closeTrigger.addEventListener("click", closeAllPanels);
    }

    // C. Mobile Hamburger Menu
    if (mobileMenuTrigger && navMenuDrawer && overlay) {
      mobileMenuTrigger.addEventListener("click", (e) => {
        e.stopPropagation();
        closeAllPanels();
        navMenuDrawer.classList.add("active");
        overlay.classList.add("active");
      });
    }

    if (mobileMenuClose) {
      mobileMenuClose.addEventListener("click", closeAllPanels);
    }

    // D. Global overlay click dismiss
    if (overlay) {
      overlay.addEventListener("click", closeAllPanels);
    }

    // E. Mobile Dropdown Sub-menu toggles
    const hasChildrenLinks = document.querySelectorAll(
      ".main-menu .menu-item.has-children > a",
    );
    hasChildrenLinks.forEach((link) => {
      const arrowTrigger = link.querySelector(".dd-trigger");
      if (arrowTrigger) {
        arrowTrigger.addEventListener("click", (e) => {
          if (window.innerWidth < 1200) {
            e.preventDefault();
            e.stopPropagation();
            const parentLi = link.parentElement;

            // Toggle active state to slide open sub-menus
            parentLi.classList.toggle("active");
          }
        });
      }
    });

    // F. Sticky Header initialization
    initStickyHeader();

    // G. Form Actions Mock setup
    initInteractiveForms();
  };

  // ==========================================
  // 5. INTERACTIVE FORM MOCKS (ALERTS)
  // ==========================================
  const initInteractiveForms = () => {
    // A. Travel Search form
    const searchForm = document.getElementById("hero-travel-search-form");
    if (searchForm) {
      searchForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(searchForm);
        const destination = formData.get("destination");
        const activity = formData.get("activity");
        const duration = formData.get("duration");
        const guests = formData.get("guests");

        showToastAlert(
          `🔍 Searching for Ultimate Trips!<br/>` +
            `<strong>Destination:</strong> ${destination}<br/>` +
            `<strong>Activity:</strong> ${activity} Tours<br/>` +
            `<strong>Duration:</strong> ${duration} Days<br/>` +
            `<strong>Guests:</strong> ${guests} People<br/><br/>` +
            `🚀 We are compiling our best packages for you...`,
        );
      });
    }

    // B. Newsletter subscription forms
    const newsletters = document.querySelectorAll(
      ".offcanvas-newsletter-form, .main-newsletter-form, .footer-newsletter-form",
    );
    newsletters.forEach((form) => {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const emailInput = form.querySelector('input[type="email"]');
        if (emailInput) {
          const email = emailInput.value;
          showToastAlert(
            `✉️ <strong>Subscribed Successfully!</strong><br/>Thank you! Weekly travel inspirations are heading to <strong>${email}</strong>.`,
          );
          emailInput.value = "";
        }
      });
    });

    // C. Contact Page Form
    const contactForm = document.querySelector(".tripex-contact-form");
    if (contactForm) {
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = contactForm.querySelector('[name="name"]').value;
        showToastAlert(
          `👋 <strong>Message Sent!</strong><br/>Hello <strong>${name}</strong>, thank you for reaching out. Our team will get back to you within 24 hours.`,
        );
        contactForm.reset();
      });
    }

    // D. Login Form Mock
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
      loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = loginForm.querySelector('[name="email"]').value;
        const role = loginForm.querySelector('[name="role"]').value;

        // Store data for the dashboard
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userRole", role);

        window.location.href = "dashboard.html";
      });
    }

    // C. Book Now buttons
    const bookButtons = document.querySelectorAll(".tour-booking-trigger");
    bookButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const cardTitle = btn
          .closest(".tripex-tour-item")
          .querySelector(".title a").innerText;
        showToastAlert(
          `✈️ <strong>Reservation Initiated!</strong><br/>` +
            `You've selected the outstanding <strong>${cardTitle}</strong> package.<br/>` +
            `A travel advisor will connect with you to finalize your booking shortly.`,
        );
      });
    });
  };

  // ==========================================
  // 6. FLOATING TOAST NOTIFICATION UTILITY
  // ==========================================
  const showToastAlert = (messageHtml) => {
    // Remove existing toasts
    const activeToast = document.querySelector(".tripex-custom-toast");
    if (activeToast) activeToast.remove();

    // Create toast container
    const toast = document.createElement("div");
    toast.className = "tripex-custom-toast";
    toast.style.cssText = `
      position: fixed;
      bottom: 30px;
      right: 30px;
      background: #1d2b1f;
      color: #ffffff;
      padding: 22px 30px;
      border-radius: 16px;
      border-left: 5px solid #73b84a;
      box-shadow: 0 15px 45px rgba(0, 0, 0, 0.3);
      z-index: 100000;
      font-size: 15px;
      max-width: 380px;
      font-family: 'Inter', sans-serif;
      animation: toastSlideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    `;

    // Add Keyframe animation inline if not present
    if (!document.getElementById("toast-keyframe-style")) {
      const style = document.createElement("style");
      style.id = "toast-keyframe-style";
      style.innerText = `
        @keyframes toastSlideIn {
          from { transform: translateY(40px) scale(0.9); opacity: 0; }
          to { transform: translateY(0) scale(1); opacity: 1; }
        }
        @keyframes toastSlideOut {
          from { transform: translateY(0) scale(1); opacity: 1; }
          to { transform: translateY(20px) scale(0.95); opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }

    // Add toast inner content
    toast.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:flex-start; gap: 15px;">
        <div style="line-height:1.6;">${messageHtml}</div>
        <span class="toast-close-x" style="cursor:pointer; font-size: 16px; opacity: 0.6; color:#ffffff;">&times;</span>
      </div>
    `;

    document.body.appendChild(toast);

    // Event listener for Close 'X'
    const closeBtn = toast.querySelector(".toast-close-x");
    const closeToast = () => {
      toast.style.animation = "toastSlideOut 0.3s ease forwards";
      setTimeout(() => {
        toast.remove();
      }, 300);
    };

    closeBtn.addEventListener("click", closeToast);

    // Auto-dismiss after 6.5 seconds
    setTimeout(() => {
      if (document.body.contains(toast)) {
        closeToast();
      }
    }, 6500);
  };

  // ==========================================
  // 8. SCROLL REVEAL ANIMATIONS
  // ==========================================
  const initScrollAnimations = () => {
    const revealElements = document.querySelectorAll(".reveal");

    if (!("IntersectionObserver" in window)) {
      revealElements.forEach((el) => el.classList.add("active"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.1 },
    );

    revealElements.forEach((el) => observer.observe(el));
  };

  // ==========================================
  // 10. PLACEHOLDER NAVIGATION REDIRECT
  // ==========================================
  const initPlaceholderRedirects = () => {
    document.addEventListener("click", (e) => {
      const target = e.target.closest("a");
      if (!target) return;

      const href = target.getAttribute("href");

      // Identify if the link is a functional trigger for UI components (Tabs, Accordions, Dropdowns)
      const isUiTrigger =
        target.hasAttribute("data-bs-toggle") ||
        target.hasAttribute("data-bs-target") ||
        target.classList.contains("dd-trigger") ||
        target.closest(".nav-tabs") ||
        target.closest(".accordion-header");

      if (isUiTrigger) return;

      // Check if navigation destination is "not given" (empty, #, or javascript:void)
      if (
        href === "#" ||
        !href ||
        href.trim() === "" ||
        href === "javascript:void(0)"
      ) {
        // Allow anchor links that point to valid sections/elements on the same page
        if (href && href.startsWith("#") && href.length > 1) {
          const sectionId = href.substring(1);
          if (document.getElementById(sectionId)) return;
        }

        e.preventDefault();
        window.location.href = "404.html";
      }
    });
  };

  // ==========================================
  // 9. GALLERY MASONRY (ISOTOPE) INITIALIZATION
  // ==========================================
  const initGalleryMasonry = () => {
    const grid = document.querySelector(".isotope-masonry-grid");
    if (
      grid &&
      typeof Isotope !== "undefined" &&
      typeof imagesLoaded !== "undefined"
    ) {
      // Initialize Isotope after images are loaded to ensure correct layout
      imagesLoaded(grid, () => {
        const iso = new Isotope(grid, {
          itemSelector: ".filter-item",
          layoutMode: "masonry",
          percentPosition: true,
        });

        // Filter functionality
        const filterNav = document.querySelector(".filter-nav-items");
        if (filterNav) {
          filterNav.addEventListener("click", (e) => {
            if (e.target.tagName === "LI") {
              const filterValue = e.target.getAttribute("data-filter");
              iso.arrange({ filter: filterValue });

              // Update active state
              filterNav
                .querySelectorAll("li")
                .forEach((li) => li.classList.remove("active"));
              e.target.classList.add("active");
            }
          });
        }
      });
    }
  };

  // ==========================================
  // 7. ORCHESTRATE EXECUTION
  // ==========================================
  // Load dynamic sub-sections and chain menus initialization
  const onComponentsLoaded = () => {
    // Check if both placeholders are loaded (we use loaded counts)
    let loadedCount = 0;
    const checkAllLoaded = () => {
      loadedCount++;
      if (loadedCount >= 2) {
        initMenuAndDrawer();
        initTourSlider();
        initDestinationSlider();
        initClientsSlider();
        initGallerySlider();
        initScrollAnimations();
        initActiveMenuLink();
        initGalleryMasonry();
        initPlaceholderRedirects();

        // Initialize AOS Animations
        if (typeof AOS !== "undefined") {
          AOS.init({ once: true, duration: 1000, offset: 100 });
        }
      }
    };

    loadComponent("header-placeholder", "header.html", checkAllLoaded);
    loadComponent("footer-placeholder", "footer.html", checkAllLoaded);

    // Force dismiss the preloader after exactly 2 seconds as requested
    setTimeout(dismissPreloader, 2000);
  };

  onComponentsLoaded();
});
