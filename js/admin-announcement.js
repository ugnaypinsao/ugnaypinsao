let announcements = JSON.parse(localStorage.getItem('announcements')) || [];

function addAnnouncement() {
    const title = document.getElementById('title').value;
    const imageInput = document.getElementById('image');
    const content = document.getElementById('content').value;

    if (!title || !content) {
        alert("Please fill out the title and content.");
        return;
    }

    const image = imageInput.files[0];
    const imageUrl = image ? URL.createObjectURL(image) : null;

    const announcement = {
        id: Date.now(),
        title,
        content,
        image: imageUrl
    };

    announcements.push(announcement);
    saveAnnouncements();
    renderAnnouncements();
    clearForm();
}

function renderAnnouncements() {
    const adminDiv = document.getElementById('adminAnnouncements');
    adminDiv.innerHTML = '';

    announcements.forEach(announcement => {
        const adminCard = document.createElement('div');
        adminCard.className = 'announcement';

        adminCard.innerHTML = `
                ${announcement.image ? `<img src="${announcement.image}" alt="Announcement Image" style="max-width: 100%;">` : ''}
                <h3>${announcement.title}</h3>
                <p>${announcement.content}</p>
                <div class="admin-actions">
                    <button onclick="editAnnouncement(${announcement.id})">Edit</button>
                    <button onclick="deleteAnnouncement(${announcement.id})">Delete</button>
                </div>
            `;
        adminDiv.appendChild(adminCard);
    });
}

function editAnnouncement(id) {
    const announcement = announcements.find(ann => ann.id === id);
    if (!announcement) return;

    const title = prompt("Edit Title:", announcement.title);
    const content = prompt("Edit Content:", announcement.content);

    if (title && content) {
        announcement.title = title;
        announcement.content = content;
        saveAnnouncements();
        renderAnnouncements();
    }
}

function deleteAnnouncement(id) {
    announcements = announcements.filter(ann => ann.id !== id);
    saveAnnouncements();
    renderAnnouncements();
}

function saveAnnouncements() {
    localStorage.setItem('announcements', JSON.stringify(announcements));
}

function clearForm() {
    document.getElementById('title').value = '';
    document.getElementById('image').value = '';
    document.getElementById('content').value = '';
}

document.addEventListener('DOMContentLoaded', renderAnnouncements);