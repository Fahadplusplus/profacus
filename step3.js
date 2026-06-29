function initStep3() {
    // Scope everything inside stepCom3
    const stepCom3 = document.querySelector('#stepCom3');
    if (!stepCom3) return;

    // Hide all category-sections on load
    stepCom3.querySelectorAll('.category-section').forEach((section) => {
        section.style.display = 'none';
    });

    // Click on the whole .checkBox div (covers label + text + checkbox)
    stepCom3.querySelectorAll('.checkBox').forEach((checkBoxDiv) => {
        checkBoxDiv.addEventListener('click', function () {
            const checkbox = this.querySelector('input[type="checkbox"]');
            
            // Toggle checkbox manually since we're listening on the div
            checkbox.checked = !checkbox.checked;

            if (checkbox.checked) {
                this.classList.add('activeBox');
            } else {
                this.classList.remove('activeBox');
            }

            // Show/hide matching category-sections
            stepCom3.querySelectorAll('.category-section').forEach((section) => {
                const sectionTitle = section.querySelector('.description-box p').textContent.trim();
                const matchingBox = [...stepCom3.querySelectorAll('.checkBox')].find(
                    (cb) => cb.querySelector('label').textContent.trim() === sectionTitle
                );

                if (matchingBox && matchingBox.classList.contains('activeBox')) {
                    section.style.display = 'block';
                } else {
                    section.style.display = 'none';
                }
            });
        });
    });
}