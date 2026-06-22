function isMobile() {
  return window.innerWidth <= 992;
}

function getSidebar() {
  return document.querySelector(".sidebar");
}

function getOverlay() {
  return document.getElementById("sidebar-overlay");
}

function openSidebar() {
  const sidebar = getSidebar();
  const overlay = getOverlay();
  if (!sidebar) return;

  sidebar.classList.add("sidebar-open");
  overlay?.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeSidebar() {
  const sidebar = getSidebar();
  const overlay = getOverlay();
  if (!sidebar) return;

  sidebar.classList.remove("sidebar-open");
  overlay?.classList.remove("active");
  document.body.style.overflow = "";
}

function handleToggleClick() {
  const sidebar = getSidebar();
  if (!sidebar) return;
  sidebar.classList.contains("sidebar-open") ? closeSidebar() : openSidebar();
}

function updateToggleButton() {
  const toggleBtn = document.getElementById("sidebar-toggle");
  if (!toggleBtn) return;

  toggleBtn.removeEventListener("click", handleToggleClick);
  toggleBtn.addEventListener("click", handleToggleClick);
}

function setupSidebarLinks() {
  const sidebarLinks = document.querySelectorAll(
    ".sidebar-link[href], .sidebar-submenu-link"
  );

  sidebarLinks.forEach((link) => {
    link.addEventListener("click", function () {
      sidebarLinks.forEach((item) => item.classList.remove("active"));
      this.classList.add("active");

      const collapseMenu = this.closest(".collapse");
      if (collapseMenu) {
        const dropdownButton = document.querySelector(
          `[data-bs-target="#${collapseMenu.id}"]`
        );

        if (dropdownButton) {
          dropdownButton.classList.add("active");
        }
      }

      if (isMobile()) {
        closeSidebar();
      }
    });
  });

  const currentPage = window.location.pathname.split("/").pop();
  sidebarLinks.forEach((link) => {
    const linkPage = link.getAttribute("href");
    if (
      linkPage &&
      linkPage !== "#" &&
      linkPage.split("/").pop() === currentPage
    ) {
      link.classList.add("active");

      const parentCollapse = link.closest(".collapse");
      if (parentCollapse) {
        parentCollapse.classList.add("show");
        const dropdownButton = document.querySelector(
          `[data-bs-target="#${parentCollapse.id}"]`
        );
        if (dropdownButton) {
          dropdownButton.classList.add("active");
          dropdownButton.setAttribute("aria-expanded", "true");
        }
      }
    }
  });
}

function initSidebar() {
  updateToggleButton();
  const overlay = getOverlay();
  if (overlay) {
    overlay.removeEventListener("click", closeSidebar);
    overlay.addEventListener("click", closeSidebar);
  }
  setupSidebarLinks();
}

window.addEventListener("sidebar-ready", initSidebar);
window.addEventListener("DOMContentLoaded", initSidebar);
initSidebar();

/*
 * Remove leftover mobile sidebar state
 * when switching back to desktop.
 */
window.addEventListener("resize", () => {
  if (!isMobile()) {
    getSidebar()?.classList.remove("sidebar-open");
    getOverlay()?.classList.remove("active");
    document.body.style.overflow = "";
  }
});

document.querySelectorAll('.sd-circle').forEach(circle => {
  circle.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelectorAll('.sd-circle').forEach(c => c.classList.remove('active'));
    this.classList.add('active');
  });
});

