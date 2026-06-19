// Fetch and inject sidebar component
fetch('sidebar.html')
  .then(response => response.text())
  .then(html => {
    document.getElementById('sidebar-placeholder').innerHTML = html;
    // Add active class functionality after sidebar is loaded
    addSidebarActiveHandlers();
  })
  .catch(error => console.error('Error loading sidebar:', error));

// Fetch and inject navbar component
fetch('navbar.html')
  .then(response => response.text())
  .then(html => {
    document.getElementById('navbar-placeholder').innerHTML = html;
  })
  .catch(error => console.error('Error loading navbar:', error));

// Fetch and inject footer component
fetch('footer.html')
  .then(response => response.text())
  .then(html => {
    document.getElementById('footer-placeholder').innerHTML = html;
  })
  .catch(error => console.error('Error loading footer:', error));

// Function to handle active class on sidebar links
function addSidebarActiveHandlers() {
  // Handle main sidebar links
  const sidebarLinks = document.querySelectorAll('.sidebar-link');
  sidebarLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Remove active class from all sidebar links
      sidebarLinks.forEach(l => l.classList.remove('active'));
      // Add active class to clicked link
      this.classList.add('active');
    });
  });

  // Handle submenu links
  const submenuLinks = document.querySelectorAll('.sidebar-submenu-link');
  submenuLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Remove active class from all submenu links
      submenuLinks.forEach(l => l.classList.remove('active'));
      // Add active class to clicked link
      this.classList.add('active');
    });
  });
}
