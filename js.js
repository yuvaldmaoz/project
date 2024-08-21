const contacts = [
    { name: 'Yuval Maoz', phone: '0507518599', email: 'yuval@gmail.com' },
    { name: 'John Doe', phone: '0501234567', email: 'john@gmail.com' },
    { name: 'Jane Doe', phone: '0509876543', email: 'jane@gmail.com' }
];
let editingContactIndex = null;

function search_users() {
    let input_value = document.getElementById('search_bar').value.toUpperCase();
    let li = document.querySelectorAll('ul li');

    for (i = 0; i < li.length; i++) {
        let name = li[i].getElementsByClassName('name')[0];
        let txtValue = name.textContent || name.innerText;
        if (txtValue.toUpperCase().indexOf(input_value) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

function renderContacts() {
    const contactList = document.getElementById('contactList');
    contactList.innerHTML = contacts.map((contact, index) => `
        <li>
            <div class="contact-info">
                <div class="name">${contact.name}</div>
            </div>
            <div class="buttons">
                <button onclick="showContactDetails(${index})">👁️ Show Details</button>
                <button class="edit_b" onclick="editContact(${index})">🖋️ Edit </button>
                <button class="delete_b" onclick="deleteContact(${index})">🗑️ Delete </button>
            </div>
        </li>
    `).join('');
}

function showContactDetails(index) {
    const contact = contacts[index];
    const detailsModal = document.getElementById('detailsModal');
    const contactDetails = document.getElementById('contactDetails');

    contactDetails.innerHTML = `
        <p><strong>Name:</strong> ${contact.name}</p>
        <p><strong>Phone:</strong> ${contact.phone}</p>
        <p><strong>Email:</strong> ${contact.email}</p>
    `;

    detailsModal.style.display = 'flex';
}

function closeDetailsModal() {
    document.getElementById('detailsModal').style.display = 'none';
}

function openModal() {
    document.getElementById('contactModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('contactModal').style.display = 'none';
    document.getElementById('contactName').value = '';
    document.getElementById('contactPhone').value = '';
    document.getElementById('contactEmail').value = '';
    editingContactIndex = null;
}

function saveContact() {
    const name = document.getElementById('contactName').value;
    const phone = document.getElementById('contactPhone').value;
    const email = document.getElementById('contactEmail').value;

    if (editingContactIndex !== null) {
        contacts[editingContactIndex] = { name, phone, email };
    } else {
        contacts.push({ name, phone, email });
    }

    closeModal();
    renderContacts();
}

function editContact(index) {
    const contact = contacts[index];
    document.getElementById('contactName').value = contact.name;
    document.getElementById('contactPhone').value = contact.phone;
    document.getElementById('contactEmail').value = contact.email;
    editingContactIndex = index;
    openModal();
}

function deleteContact(index) {
    contacts.splice(index, 1);
    renderContacts();
}

document.addEventListener('DOMContentLoaded', renderContacts);
