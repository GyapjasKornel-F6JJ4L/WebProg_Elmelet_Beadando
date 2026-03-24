// Alkalmazás adatai tömbben tárolva (gep.txt adatai alapján)
let users = [
  { id: 1, hely: 'T403', tipus: 'asztali', ipcim: '192.168.2.1' },
  { id: 2, hely: 'T212', tipus: 'asztali', ipcim: '192.168.2.2' },
  { id: 3, hely: 'T302', tipus: 'asztali', ipcim: '192.168.2.3' },
  { id: 4, hely: 'T108', tipus: 'notebook', ipcim: '192.168.1.1' },
  { id: 5, hely: 'T301', tipus: 'asztali', ipcim: '192.168.2.4' },
  { id: 6, hely: 'T306', tipus: 'asztali', ipcim: '192.168.2.5' },
  { id: 7, hely: 'T209', tipus: 'notebook', ipcim: '192.168.4.1' },
  { id: 8, hely: 'T208', tipus: 'notebook', ipcim: '192.168.4.2' },
  { id: 9, hely: 'T110', tipus: 'notebook', ipcim: '192.168.1.2' },
  { id: 10, hely: 'T310', tipus: 'asztali', ipcim: '192.168.2.6' },
  { id: 11, hely: 'T207', tipus: 'asztali', ipcim: '192.168.2.7' },
  { id: 12, hely: 'T109', tipus: 'notebook', ipcim: '192.168.1.3' }
];

// Következő azonosító meghatározása
let nextId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;

// DOM elemek
const tbody = document.querySelector('#users-table tbody');
const form = document.getElementById('crud-form');
const formTitle = document.getElementById('form-title');
const cancelBtn = document.getElementById('cancel-btn');

// Megjelenítés / Read
function renderTable() {
  tbody.innerHTML = '';
  users.forEach(user => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${user.id}</td>
      <td>${user.hely}</td>
      <td>${user.tipus}</td>
      <td>${user.ipcim}</td>
      <td class="actions">
        <button class="btn btn-warning" onclick="editUser(${user.id})">Szerkesztés</button>
        <button class="btn btn-danger" onclick="deleteUser(${user.id})">Törlés</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// Űrlap alapállapotba helyezése
function resetForm() {
  form.reset();
  document.getElementById('user-id').value = '';
  formTitle.textContent = 'Új gép hozzáadása';
  cancelBtn.style.display = 'none';
}

// Létrehozás és Frissítés / Create and Update
form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const id = document.getElementById('user-id').value;
  const hely = document.getElementById('hely').value;
  const tipus = document.getElementById('tipus').value;
  const ipcim = document.getElementById('ipcim').value;

  if (id) {
    // Ha van ID, akkor frissítjük a meglevőt (Update)
    const index = users.findIndex(u => u.id == id);
    if (index !== -1) {
      users[index] = { id: parseInt(id), hely, tipus, ipcim };
    }
  } else {
    // Ha nincs ID, akkor újat hozunk létre (Create)
    users.push({ id: nextId++, hely, tipus, ipcim });
  }

  renderTable();
  resetForm();
});

// Szerkesztés előkészítése / Prepare for Update
window.editUser = function(id) {
  const user = users.find(u => u.id === id);
  if (user) {
    document.getElementById('user-id').value = user.id;
    document.getElementById('hely').value = user.hely;
    document.getElementById('tipus').value = user.tipus;
    document.getElementById('ipcim').value = user.ipcim;
    
    formTitle.textContent = 'Gép szerkesztése (ID: ' + user.id + ')';
    cancelBtn.style.display = 'inline-block';
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Görgetés az űrlaphoz
  }
};

// Törlés / Delete
window.deleteUser = function(id) {
  if (confirm('Biztosan törölni szeretné a(z) ' + id + ' azonosítójú gépet?')) {
    users = users.filter(u => u.id !== id);
    renderTable();
  }
};

// Mégse gomb eseménykezelője
cancelBtn.addEventListener('click', resetForm);

// Kezdeti megjelenítés futtatása
renderTable();
