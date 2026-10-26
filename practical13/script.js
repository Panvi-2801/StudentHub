// script.js - Fetch API Asynchronous Calls
const API_URL = 'api.php';

const form = document.getElementById('event-form');
const eventIdInput = document.getElementById('event-id');
const titleInput = document.getElementById('title');
const venueInput = document.getElementById('venue');
const dateInput = document.getElementById('event_date');
const saveBtn = document.getElementById('save-btn');
const cancelBtn = document.getElementById('cancel-btn');
const formHeading = document.getElementById('form-heading');
const tbody = document.getElementById('events-tbody');
const statusBanner = document.getElementById('status-banner');

// Helper: Show Feedback Banner (Success / Error / Loading)
function showBanner(message, type) {
  statusBanner.textContent = message;
  statusBanner.className = '';
  statusBanner.classList.add(`banner-${type}`);
  statusBanner.style.display = 'block';

  if (type !== 'loading') {
    setTimeout(() => {
      statusBanner.style.display = 'none';
    }, 3500);
  }
}

// 1. LIST OPERATION (GET)
async function loadEvents() {
  tbody.innerHTML = '<tr><td colspan="5">Fetching latest events...</td></tr>';
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    
    const result = await res.json();

    tbody.innerHTML = '';
    if (result.success && result.data.length > 0) {
      result.data.forEach(evt => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${evt.id}</td>
          <td>${escapeHtml(evt.title)}</td>
          <td>${escapeHtml(evt.venue)}</td>
          <td>${evt.event_date}</td>
          <td>
            <button class="btn-edit" onclick="populateEditForm(${evt.id}, '${escapeHtml(evt.title)}', '${escapeHtml(evt.venue)}', '${evt.event_date}')">Edit</button>
            <button class="btn-delete" onclick="deleteEvent(${evt.id})">Delete</button>
          </td>
        `;
        tbody.appendChild(tr);
      });
    } else {
      tbody.innerHTML = '<tr><td colspan="5">No events found. Add your first event above!</td></tr>';
    }
  } catch (error) {
    console.error('Error fetching events:', error);
    showBanner('Failed to load events. Check API connection.', 'error');
    tbody.innerHTML = '<tr><td colspan="5" style="color:red;">Error loading records.</td></tr>';
  }
}

// 2. CREATE & UPDATE OPERATIONS (POST & PUT)
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const id = eventIdInput.value;
  const isEditing = Boolean(id);

  const payload = {
    title: titleInput.value.trim(),
    venue: venueInput.value.trim(),
    event_date: dateInput.value
  };

  if (isEditing) {
    payload.id = id;
  }

  const method = isEditing ? 'PUT' : 'POST';
  showBanner(isEditing ? 'Updating event...' : 'Saving event...', 'loading');

  try {
    const res = await fetch(API_URL, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const result = await res.json();

    if (res.ok && result.success) {
      showBanner(result.message, 'success');
      resetForm();
      loadEvents();
    } else {
      showBanner(result.message || 'Operation failed.', 'error');
    }
  } catch (error) {
    console.error('Submission error:', error);
    showBanner('Network error occurred while submitting.', 'error');
  }
});

// 3. DELETE OPERATION (DELETE)
async function deleteEvent(id) {
  if (!confirm(`Are you sure you want to delete Event #${id}?`)) {
    return;
  }

  showBanner('Deleting event...', 'loading');

  try {
    const res = await fetch(API_URL, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: id })
    });

    const result = await res.json();

    if (res.ok && result.success) {
      showBanner(result.message, 'success');
      loadEvents();
    } else {
      showBanner(result.message || 'Failed to delete event.', 'error');
    }
  } catch (error) {
    console.error('Delete error:', error);
    showBanner('Network error occurred while deleting.', 'error');
  }
}

// Set form to Edit mode
function populateEditForm(id, title, venue, date) {
  eventIdInput.value = id;
  titleInput.value = title;
  venueInput.value = venue;
  dateInput.value = date;

  formHeading.textContent = `Edit Event #${id}`;
  saveBtn.textContent = 'Update Event';
  cancelBtn.style.display = 'inline-block';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Reset form to Add mode
function resetForm() {
  eventIdInput.value = '';
  form.reset();
  formHeading.textContent = 'Add New Event';
  saveBtn.textContent = 'Add Event';
  cancelBtn.style.display = 'none';
}

cancelBtn.addEventListener('click', resetForm);

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Initial Call
document.addEventListener('DOMContentLoaded', loadEvents);