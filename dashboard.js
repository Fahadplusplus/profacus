function isMobile() {
  return window.innerWidth <= 992;
}
function getSidebar()  { return document.querySelector(".sidebar"); }
function getOverlay()  { return document.getElementById("sidebar-overlay"); }

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

/* ── Mobile hamburger ── */
function handleToggleClick() {
  const sidebar = getSidebar();
  if (!sidebar) return;
  sidebar.classList.contains("sidebar-open") ? closeSidebar() : openSidebar();
}

/* ── Desktop sidebar toggle ── */
function handleDesktopToggle() {
  document.body.classList.toggle("sidebar-collapsed");

  // Flip the icon between sidebar and sidebar-reverse
  const btn = document.getElementById("sidebar-desktop-toggle");
  if (!btn) return;
  const icon = btn.querySelector("i");
  if (!icon) return;
  const isCollapsed = document.body.classList.contains("sidebar-collapsed");
  icon.className = isCollapsed
    ? "bi bi-layout-sidebar-reverse"
    : "bi bi-layout-sidebar";
}

function updateToggleButton() {
  const mobileBtn  = document.getElementById("sidebar-toggle");
  const desktopBtn = document.getElementById("sidebar-desktop-toggle");

  if (mobileBtn) {
    mobileBtn.removeEventListener("click", handleToggleClick);
    mobileBtn.addEventListener("click", handleToggleClick);
  }
  if (desktopBtn) {
    desktopBtn.removeEventListener("click", handleDesktopToggle);
    desktopBtn.addEventListener("click", handleDesktopToggle);
  }
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
        if (dropdownButton) dropdownButton.classList.add("active");
      }

      if (isMobile()) closeSidebar();
    });
  });

  const currentPage = window.location.pathname.split("/").pop();
  sidebarLinks.forEach((link) => {
    const linkPage = link.getAttribute("href");
    if (linkPage && linkPage !== "#" && linkPage.split("/").pop() === currentPage) {
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



