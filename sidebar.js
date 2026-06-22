Promise.all([
  fetch('sidebar.html').then(response => response.text()),
  fetch('navbar.html').then(response => response.text()),
  fetch('footer.html').then(response => response.text())
])
  .then(([sidebarHtml, navbarHtml, footerHtml]) => {
    document.getElementById('sidebar-placeholder').innerHTML = sidebarHtml;
    document.getElementById('navbar-placeholder').innerHTML = navbarHtml;
    document.getElementById('footer-placeholder').innerHTML = footerHtml;
    addSidebarActiveHandlers();
    window.dispatchEvent(new Event('sidebar-ready'));
  })
  .catch(error => console.error('Error loading layout components:', error));

// Function to handle active class on sidebar links
function addSidebarActiveHandlers() {
  const sidebarLinks = document.querySelectorAll('.sidebar-link');
  const dropdownButtons = document.querySelectorAll('.sidebar-dropdown-btn');

  sidebarLinks.forEach(link => {
    link.addEventListener('click', function() {
      sidebarLinks.forEach(l => l.classList.remove('active'));
      dropdownButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
    });
  });

  const submenuLinks = document.querySelectorAll('.sidebar-submenu-link');
  submenuLinks.forEach(link => {
    link.addEventListener('click', function() {
      submenuLinks.forEach(l => l.classList.remove('active'));
      sidebarLinks.forEach(l => l.classList.remove('active'));
      dropdownButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
    });
  });
}
