const sidebar   = document.querySelector('.sidebar');
const overlay   = document.getElementById('sidebar-overlay');
const toggleBtn = document.getElementById('sidebar-toggle');

function isMobile() { return window.innerWidth <= 992; }

function openSidebar() {
  sidebar.classList.add('sidebar-open');
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeSidebar() {
  sidebar.classList.remove('sidebar-open');
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}

toggleBtn.addEventListener('click', () => {
  sidebar.classList.contains('sidebar-open') ? closeSidebar() : openSidebar();
});

overlay.addEventListener('click', closeSidebar);

// Close sidebar when a nav link is clicked on mobile
sidebar.querySelectorAll('.nav-item a').forEach(link => {
  link.addEventListener('click', () => { if (isMobile()) closeSidebar(); });
});

// On resize: if going back to desktop, clean up any leftover mobile state
window.addEventListener('resize', () => {
  if (!isMobile()) {
    sidebar.classList.remove('sidebar-open');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
});
document.querySelectorAll('.prism-card').forEach(card => {
    card.addEventListener('click', () => {
        document.querySelectorAll('.prism-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
    });
});

document.querySelectorAll('.sd-step').forEach(step => {
    step.addEventListener('click', () => {

        // Remove active from all circles and labels
        document.querySelectorAll('.sd-circle').forEach(c => c.classList.remove('active'));
        document.querySelectorAll('.sd-step .name').forEach(n => n.classList.remove('active-label'));

        // Add active to clicked step
        step.querySelector('.sd-circle').classList.add('active');
        step.querySelectorAll('.name').forEach(n => n.classList.add('active-label'));
    });
});


     const dropdownButtons = document.querySelectorAll(".dropdown-toggle-btn");

  dropdownButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const currentMenu = this.closest(".menu-group");
      currentMenu.classList.toggle("open");
    });
  });
