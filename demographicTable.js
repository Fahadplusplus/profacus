
// ── Dummy data ──
const allEmployees = Array.from({ length: 50 }, (_, i) => ({
    name: 'Anonymous',

    status: 'Active'
  
}));
 
let currentPage = 1;
const rowsPerPage = 10;
let filtered = [...allEmployees];
 
function statusBadge(status) {
    const map = {
        'Active': 'badge-complete',
        'pending':     'badge-sent',
        'Not Sent': 'badge-not-sent'
    };
    return `<span class="badge-status ${map[status] || ''}">${status}</span>`;
}
 
function renderTable() {
    const start = (currentPage - 1) * rowsPerPage;
    const end   = start + rowsPerPage;
    const rows  = filtered.slice(start, end);
 
    const tbody = document.getElementById('tableBody');
    tbody.innerHTML = rows.map(r => `
        <tr>
            <td>${r.name}</td>
           
            <td>${statusBadge(r.status)}</td>
           
            <td >
                <div class="action-icons">
                    <a href="#" title="Edit"><i class="bi bi-pencil">Edit</i></a>
                   
                </div>
            </td>
        </tr>
    `).join('');
 
    document.getElementById('tableInfo').textContent =
        `Showing ${start + 1}-${Math.min(end, filtered.length)} from ${filtered.length}`;
 
    renderPagination();
}
 
function renderPagination() {
    const totalPages = Math.ceil(filtered.length / rowsPerPage);
    const ul = document.getElementById('pagination');
    let html = '';
 
    html += `<li class="prev-next ${currentPage === 1 ? 'disabled' : ''}">
                <a href="#" onclick="goPage(${currentPage - 1});return false;">&lt;&lt; Previous</a>
             </li>`;
 
    const pages = getPageNumbers(currentPage, totalPages);
    pages.forEach(p => {
        if (p === '...') {
            html += `<li class="dots"><a href="#">...</a></li>`;
        } else {
            html += `<li class="${p === currentPage ? 'active' : ''}">
                        <a href="#" onclick="goPage(${p});return false;">${p}</a>
                     </li>`;
        }
    });
 
    html += `<li class="prev-next ${currentPage === totalPages ? 'disabled' : ''}">
                <a href="#" onclick="goPage(${currentPage + 1});return false;">Next &gt;&gt;</a>
             </li>`;
 
    ul.innerHTML = html;
}
 
function getPageNumbers(current, total) {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
    if (current <= 4) return [1, 2, 3, 4, 5, '...', total];
    if (current >= total - 3) return [1, '...', total-4, total-3, total-2, total-1, total];
    return [1, '...', current - 1, current, current + 1, '...', total];
}
 
function goPage(page) {
    const totalPages = Math.ceil(filtered.length / rowsPerPage);
    if (page < 1 || page > totalPages) return;
    currentPage = page;
    renderTable();
}
 
// ── Filters ──
document.getElementById('statusFilter').addEventListener('change', function () {
    const val = this.value;
    filtered = val ? allEmployees.filter(e => e.status === val) : [...allEmployees];
    currentPage = 1;
    renderTable();
});
 

 
// ── Add Employee Modal ──
let addModal;
function openAddModal() {
    if (!addModal) addModal = new bootstrap.Modal(document.getElementById('addEmployeeModal'));
    addModal.show();
}
 
function addEmployee() {
    const name    = document.getElementById('modalName').value.trim() || 'Anonymous';
    const empId   = document.getElementById('modalEmpId').value.trim() || 'p-new';
    const email   = document.getElementById('modalEmail').value.trim() || 'NA';
    const channel = document.getElementById('modalChannel').value;
 
    allEmployees.unshift({ name, empId, email, channel, status: 'Not Sent', reminder: '0 time', time: 'Not Schedule' });
    filtered = [...allEmployees];
    currentPage = 1;
    renderTable();
    addModal.hide();
 
    // clear fields
    ['modalName','modalEmpId','modalEmail'].forEach(id => document.getElementById(id).value = '');
}
 
// ── Init ──
renderTable();
