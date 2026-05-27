document.addEventListener("DOMContentLoaded", () => {
  // Get data from localStorage
  const email = localStorage.getItem("userEmail");
  const role = localStorage.getItem("userRole");

  // Redirect to login if no data found
  if (!email || !role) {
    window.location.href = "login.html";
    return;
  }

  // Update UI components
  const updateElementText = (id, value) => {
    const element = document.getElementById(id);
    if (element) {
      element.innerText = value;
    }
  };

  updateElementText("display-email", email);
  updateElementText("welcome-email", email.split("@")[0]);
  updateElementText("display-role-badge", role);
  updateElementText("role-text", role);

  // Set profile email input if it exists
  const profileEmail = document.getElementById("profile-email-input");
  if (profileEmail) profileEmail.value = email;

  // Handle Role-Based Sidebar Visibility
  const allSidebarListItems = document.querySelectorAll(".sidebar-nav ul li"); // Select all list items in the sidebar
  allSidebarListItems.forEach((item) => {
    const targetRole = item.getAttribute("data-role"); // Get the data-role attribute

    if (targetRole) {
      // If the item has a data-role attribute
      if (role === "admin") {
        item.style.display = "block"; // Show all role-specific items for admin
      } else if (targetRole === role) {
        item.style.display = "block"; // Show items matching the user's role
      } else {
        item.style.display = "none"; // Hide items not matching the user's role
      }
    } else {
      // If no data-role attribute, it's a general item, always show it
      item.style.display = "block";
    }
  });

  // Navigation logic for existing sidebar links
  const navLinks = document.querySelectorAll(
    ".sidebar-nav li a:not(#logout-btn)",
  );
  const sections = document.querySelectorAll(".content-section");

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetHref = link.getAttribute("href");

      if (targetHref.startsWith("#")) {
        e.preventDefault();
        const targetId = targetHref.substring(1);

        // Update Active Link UI
        navLinks.forEach((l) => l.classList.remove("active"));
        link.classList.add("active");

        // Show correct section, hide others
        sections.forEach((sec) => {
          sec.style.display = sec.id === targetId ? "block" : "none";
        });
      }
    });
  });

  // Mobile Sidebar Toggle Logic
  const sidebar = document.getElementById("dashboard-sidebar");
  const overlay = document.getElementById("sidebar-overlay");
  const toggleBtn = document.getElementById("sidebar-toggle-btn");
  const closeBtn = document.getElementById("sidebar-close-btn");

  const toggleSidebar = () => {
    sidebar.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.style.overflow = sidebar.classList.contains("active")
      ? "hidden"
      : "";
  };

  if (toggleBtn) toggleBtn.addEventListener("click", toggleSidebar);
  if (closeBtn) closeBtn.addEventListener("click", toggleSidebar);
  if (overlay) overlay.addEventListener("click", toggleSidebar);

  // Close sidebar when a nav link is clicked (mobile)
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth < 992 && sidebar.classList.contains("active")) {
        toggleSidebar();
      }
    });
  });

  // Logout Handler
  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.clear();
      window.location.href = "login.html";
    });
  }
});
