// ── Dummy data for Test Plan table ──
const allTestPlans = Array.from({ length: 50 }, (_, i) => {
    const isComplete = i % 2 === 0;
    return {
        name: 'Test Plan',
        dimensions: 'Other',
        statement: isComplete
            ? 'Lorem Ipsum is simply dummy text of the printing'
            : 'Lorem Ipsum is simply dummy',
        status: isComplete ? 'Complete' : 'Delayed',
        completion: isComplete ? 89 : 43,
        completionDate: '07-06-2026'
    };
});

let currentPageTP = 1;
const rowsPerPageTP = 5;
let filteredTP = [...allTestPlans];

function testPlanStatusBadge(status) {
    const cls = status === 'Complete' ? 'badge-complete-plan' : 'badge-delayed';
    return `<span class="badge-status ${cls}">${status}</span>`;
}

function progressBar(percent, status) {
    const cls = status === 'Complete' ? 'complete' : 'delayed';
    return `
        <div class="progress-cell">
            <div class="progress-track">
                <div class="progress-fill ${cls}" style="width:${percent}%;"></div>
            </div>
            <span class="progress-percent ${cls}">${percent}%</span>
        </div>
    `;
}

function renderTestPlanTable() {
    const start = (currentPageTP - 1) * rowsPerPageTP;
    const end   = start + rowsPerPageTP;
    const rows  = filteredTP.slice(start, end);

    const tbody = document.getElementById('testPlanBody');
    tbody.innerHTML = rows.map(r => `
        <tr>
            <td>${r.name}</td>
            <td>${r.dimensions}</td>
            <td>${r.statement}</td>
            <td>${testPlanStatusBadge(r.status)}</td>
            <td>${progressBar(r.completion, r.status)}</td>
            <td>${r.completionDate}</td>
            <td>
                <div class="action-icons-table">
                    <a href="#" title="View"><i class="bi bi-eye"></i></a>
                    <a href="#" title="Edit"><i class="bi bi-pencil"></i></a>
                    <a href="#" class="del" title="Delete"><i class="bi bi-trash"></i></a>
                </div>
            </td>
        </tr>
    `).join('');

    document.getElementById('testPlanInfo').textContent =
        `Showing ${start + 1}-${Math.min(end, filteredTP.length)} from ${filteredTP.length}`;

    renderTestPlanPagination();
}

function renderTestPlanPagination() {
    const totalPages = Math.ceil(filteredTP.length / rowsPerPageTP);
    const ul = document.getElementById('testPlanPagination');
    let html = '';

    html += `<li class="prev-next ${currentPageTP === 1 ? 'disabled' : ''}">
                <a href="#" onclick="goPageTP(${currentPageTP - 1});return false;">&lt;&lt; Previous</a>
             </li>`;

    const pages = getPageNumbers(currentPageTP, totalPages);
    pages.forEach(p => {
        if (p === '...') {
            html += `<li class="dots"><a href="#">...</a></li>`;
        } else {
            html += `<li class="${p === currentPageTP ? 'active' : ''}">
                        <a href="#" onclick="goPageTP(${p});return false;">${p}</a>
                     </li>`;
        }
    });

    html += `<li class="prev-next ${currentPageTP === totalPages ? 'disabled' : ''}">
                <a href="#" onclick="goPageTP(${currentPageTP + 1});return false;">Next &gt;&gt;</a>
             </li>`;

    ul.innerHTML = html;
}

function goPageTP(page) {
    const totalPages = Math.ceil(filteredTP.length / rowsPerPageTP);
    if (page < 1 || page > totalPages) return;
    currentPageTP = page;
    renderTestPlanTable();
}
function getPageNumbers(current, total) {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
    if (current <= 4) return [1, 2, 3, 4, 5, '...', total];
    if (current >= total - 3) return [1, '...', total-4, total-3, total-2, total-1, total];
    return [1, '...', current - 1, current, current + 1, '...', total];
}

// ── Init ──
renderTestPlanTable();