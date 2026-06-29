Promise.all([
  fetch('sidebar.html').then(response => response.text()),
  fetch('navbar.html').then(response => response.text()),
  fetch('footer.html').then(response => response.text()),
   fetch('surveyStep1.html').then(response => response.text()),
    fetch('surveyStep2.html').then(response => response.text()),
     fetch('surveyStep3.html').then(response => response.text())
])
  .then(([sidebarHtml, navbarHtml, footerHtml, step1Html, step2Html, step3Html]) => {
    document.getElementById('sidebar-placeholder').innerHTML = sidebarHtml;
    document.getElementById('navbar-placeholder').innerHTML = navbarHtml;
    document.getElementById('footer-placeholder').innerHTML = footerHtml;

    const stepCom1 = document.getElementById('stepCom1');
    const stepCom2 = document.getElementById('stepCom2');
    const stepCom3 = document.getElementById('stepCom3');

    function replaceStepPlaceholder(placeholderId, htmlString) {
      const placeholder = document.getElementById(placeholderId);
      if (!placeholder) return false;

      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlString, 'text/html');
      const stepElement = doc.querySelector('.step-content') || doc.body.firstElementChild;
      if (stepElement) {
        placeholder.replaceWith(stepElement);
        return true;
      }

      placeholder.innerHTML = htmlString;
      return true;
    }

    if (stepCom1 && stepCom2 && stepCom3) {
      replaceStepPlaceholder('stepCom1', step1Html);
      replaceStepPlaceholder('stepCom2', step2Html);
      replaceStepPlaceholder('stepCom3', step3Html);
      initSteps();
      initStep3();
      initEmployeeSteps()
    }

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

function initSteps() {
    const stepsContainer = document.querySelector('.surveysteps .stepcon');
    if (!stepsContainer) return;
    
    const steps = stepsContainer.querySelectorAll('.step');
    const stepContents = document.querySelectorAll('.step-content');

    stepContents.forEach(content => content.style.display = 'none');
    document.getElementById('stepCom1').style.display = 'block';

    steps.forEach((step, index) => {
        step.addEventListener('click', function (e) {
            e.preventDefault();

            steps.forEach(s => s.classList.remove('active'));
            this.classList.add('active');

            stepContents.forEach(content => content.style.display = 'none');
            document.getElementById(`stepCom${index + 1}`).style.display = 'block';
        });
    });
}

function initEmployeeSteps() {
    // Scope to stepCom1 only so it doesn't clash with initSteps
    const container = document.getElementById('stepCom1');
    if (!container) return;

    const step1 = container.querySelector('.step:nth-child(1)');
    const step2 = container.querySelector('.step:nth-child(2)');
    const step1div = container.querySelector('.step1div');
    const step2div = container.querySelector('.step2div');

    if (!step1 || !step2 || !step1div || !step2div) return;

    // Initial state
    step2div.style.display = 'none';

    step1.addEventListener('click', function (e) {
        e.preventDefault();
        step1.classList.add('active');
        step2.classList.remove('active');
        step1div.style.display = 'block';
        step2div.style.display = 'none';
    });

    step2.addEventListener('click', function (e) {
        e.preventDefault();
        step2.classList.add('active');
        step1.classList.remove('active');
        step2div.style.display = 'block';
        step1div.style.display = 'none';
    });
}





