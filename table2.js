// ── Dummy data for Step 2 table ──
const allParticipants = Array.from({ length: 50 }, (_, i) => ({
    name: 'Anonymous',
    empId: 'p-' + (i + 1),
    email: 'NA',
    mobile: 'NA',
    createdAt: '2026-06-08  16:20:42'
}));

let currentPage2 = 1;
const rowsPerPage2 = 5;
let filtered2 = [...allParticipants];

function renderTable2() {
    const start = (currentPage2 - 1) * rowsPerPage2;
    const end   = start + rowsPerPage2;
    const rows  = filtered2.slice(start, end);

    const tbody = document.getElementById('tableBody2');
    tbody.innerHTML = rows.map(r => `
        <tr>
            <td>${r.name}</td>
            <td>${r.empId}</td>
            <td>${r.email}</td>
            <td>${r.mobile}</td>
            <td>${r.createdAt}</td>
        </tr>
    `).join('');

    document.getElementById('tableInfo2').textContent =
        `Showing ${start + 1}-${Math.min(end, filtered2.length)} from ${filtered2.length}`;

    renderPagination2();
}

function renderPagination2() {
    const totalPages = Math.ceil(filtered2.length / rowsPerPage2);
    const ul = document.getElementById('pagination2');
    let html = '';

    html += `<li class="prev-next ${currentPage2 === 1 ? 'disabled' : ''}">
                <a href="#" onclick="goPage2(${currentPage2 - 1});return false;">&lt;&lt; Previous</a>
             </li>`;

    const pages = getPageNumbers(currentPage2, totalPages);
    pages.forEach(p => {
        if (p === '...') {
            html += `<li class="dots"><a href="#">...</a></li>`;
        } else {
            html += `<li class="${p === currentPage2 ? 'active' : ''}">
                        <a href="#" onclick="goPage2(${p});return false;">${p}</a>
                     </li>`;
        }
    });

    html += `<li class="prev-next ${currentPage2 === totalPages ? 'disabled' : ''}">
                <a href="#" onclick="goPage2(${currentPage2 + 1});return false;">Next &gt;&gt;</a>
             </li>`;

    ul.innerHTML = html;
}

function goPage2(page) {
    const totalPages = Math.ceil(filtered2.length / rowsPerPage2);
    if (page < 1 || page > totalPages) return;
    currentPage2 = page;
    renderTable2();
}