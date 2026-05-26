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
  document.getElementById("display-email").innerText = email;
  document.getElementById("welcome-email").innerText = email.split("@")[0];
  document.getElementById("display-role-badge").innerText = role;
  document.getElementById("role-text").innerText = role;

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
