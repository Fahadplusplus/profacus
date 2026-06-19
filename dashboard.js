const sidebar = document.querySelector(".sidebar");
const overlay = document.getElementById("sidebar-overlay");
const toggleBtn = document.getElementById("sidebar-toggle");

function isMobile() {
  return window.innerWidth <= 992;
}

function openSidebar() {
  if (!sidebar) return;

  sidebar.classList.add("sidebar-open");

  if (overlay) {
    overlay.classList.add("active");
  }

  document.body.style.overflow = "hidden";
}

function closeSidebar() {
  if (!sidebar) return;

  sidebar.classList.remove("sidebar-open");

  if (overlay) {
    overlay.classList.remove("active");
  }

  document.body.style.overflow = "";
}

if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    sidebar.classList.contains("sidebar-open")
      ? closeSidebar()
      : openSidebar();
  });
}

if (overlay) {
  overlay.addEventListener("click", closeSidebar);
}

/*
 * Add active class to normal sidebar links
 * and sidebar submenu links.
 */
const sidebarLinks = document.querySelectorAll(
  ".sidebar-link[href], .sidebar-submenu-link"
);

sidebarLinks.forEach((link) => {
  link.addEventListener("click", function () {
    sidebarLinks.forEach((item) => {
      item.classList.remove("active");
    });

    this.classList.add("active");

    /*
     * When a submenu link is selected, also mark its
     * parent dropdown button as active.
     */
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

/*
 * Set active link automatically based on the
 * current page URL.
 */
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

/*
 * Remove leftover mobile sidebar state
 * when switching back to desktop.
 */
window.addEventListener("resize", () => {
  if (!isMobile()) {
    sidebar?.classList.remove("sidebar-open");
    overlay?.classList.remove("active");
    document.body.style.overflow = "";
  }
});