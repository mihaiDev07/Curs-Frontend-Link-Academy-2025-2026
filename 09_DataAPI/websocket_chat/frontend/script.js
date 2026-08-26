let ws;
let currentUsername = null;
let currentMessageId = null;
const API_BASE_URL = 'http://localhost:3000/api';
const WS_URL = 'ws://localhost:3000';

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
    initWebSocket();
    setupEventListeners();
    loadMessages();
});

// Setup Event Listeners
function setupEventListeners() {
    document.getElementById('sendBtn').addEventListener('click', sendMessage);
    document.getElementById('message').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
    document.getElementById('editConfirmBtn').addEventListener('click', confirmEdit);
    document.getElementById('editCancelBtn').addEventListener('click', cancelEdit);
}

// Initialize WebSocket Connection
function initWebSocket() {
    ws = new WebSocket(WS_URL);

    ws.onopen = () => {
        updateStatus('Connected to server ✓', 'success');
        console.log('WebSocket connected');
    };

    ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        handleWebSocketMessage(data);
    };

    ws.onerror = (error) => {
        updateStatus('Connection error ✗', 'error');
        console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
        updateStatus('Disconnected from server', 'error');
        console.log('WebSocket disconnected');
        // Attempt to reconnect after 3 seconds
        setTimeout(initWebSocket, 3000);
    };
}

// Handle WebSocket Messages
function handleWebSocketMessage(data) {
    switch (data.type) {
        case 'init':
            displayMessages(data.messages);
            break;
        case 'new_message':
            addMessageToUI(data.message);
            break;
        case 'edit_message':
            updateMessageInUI(data.message);
            break;
        case 'delete_message':
            removeMessageFromUI(data.messageId);
            break;
    }
}

// Send Message
async function sendMessage() {
    const usernameInput = document.getElementById('username').value.trim();
    const messageInput = document.getElementById('message').value.trim();

    if (!usernameInput) {
        updateStatus('Please enter your name', 'error');
        document.getElementById('username').focus();
        return;
    }

    if (!messageInput) {
        updateStatus('Please type a message', 'error');
        document.getElementById('message').focus();
        return;
    }

    currentUsername = usernameInput;

    try {
        updateStatus('Sending...', '');
        const response = await axios.post(`${API_BASE_URL}/messages`, {
            username: usernameInput,
            text: messageInput
        });

        document.getElementById('message').value = '';
        updateStatus('Message sent ✓', 'success');
    } catch (error) {
        console.error('Error sending message:', error);
        updateStatus('Failed to send message', 'error');
    }
}

// Load Initial Messages
async function loadMessages() {
    try {
        const response = await axios.get(`${API_BASE_URL}/messages`);
        displayMessages(response.data);
    } catch (error) {
        console.error('Error loading messages:', error);
        updateStatus('Failed to load messages', 'error');
    }
}

// Display Messages on UI
function displayMessages(messages) {
    const messagesContainer = document.getElementById('messages');

    if (messages.length === 0) {
        messagesContainer.innerHTML = '<div class="placeholder">Waiting for messages...</div>';
        return;
    }

    messagesContainer.innerHTML = '';
    messages.forEach(message => {
        addMessageToUI(message);
    });
}

// Add Single Message to UI
function addMessageToUI(message) {
    const messagesContainer = document.getElementById('messages');
    const placeholder = messagesContainer.querySelector('.placeholder');

    if (placeholder) {
        placeholder.remove();
    }

    const isOwnMessage = message.username === currentUsername;
    const messageElement = createMessageElement(message, isOwnMessage);
    messagesContainer.appendChild(messageElement);

    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Create Message Element
function createMessageElement(message, isOwn) {
    const div = document.createElement('div');
    div.className = `message ${isOwn ? 'own' : ''}`;
    div.setAttribute('data-id', message.id);

    const time = new Date(message.timestamp).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    });

    let editedIndicator = '';
    if (message.edited) {
        editedIndicator = `<span class="message-edited">(edited)</span>`;
    }

    let actionsHTML = '';
    if (isOwn) {
        actionsHTML = `
            <div class="message-actions">
                <button class="btn-edit" onclick="openEditModal(${message.id}, '${escapeHtml(message.text)}')">✏️ Edit</button>
                <button class="btn-delete" onclick="deleteMessage(${message.id})">🗑️ Delete</button>
            </div>
        `;
    }

    div.innerHTML = `
        <div class="message-header">
            <span class="message-username">${escapeHtml(message.username)}</span>
            <div>
                <span class="message-time">${time}</span>
                ${editedIndicator}
            </div>
        </div>
        <div class="message-text">${escapeHtml(message.text)}</div>
        ${actionsHTML}
    `;

    return div;
}

// Update Message in UI
function updateMessageInUI(message) {
    const messageElement = document.querySelector(`[data-id="${message.id}"]`);
    if (messageElement) {
        const isOwn = message.username === currentUsername;
        messageElement.innerHTML = createMessageElement(message, isOwn).innerHTML;
    }
}

// Remove Message from UI
function removeMessageFromUI(messageId) {
    const messageElement = document.querySelector(`[data-id="${messageId}"]`);
    if (messageElement) {
        messageElement.style.animation = 'slideIn 0.3s ease-in-out reverse';
        setTimeout(() => {
            messageElement.remove();

            // Check if no messages left
            const messagesContainer = document.getElementById('messages');
            if (messagesContainer.children.length === 0) {
                messagesContainer.innerHTML = '<div class="placeholder">Waiting for messages...</div>';
            }
        }, 300);
    }
}

// Open Edit Modal
function openEditModal(messageId, messageText) {
    currentMessageId = messageId;
    document.getElementById('editText').value = messageText;
    document.getElementById('editModal').classList.add('active');
    document.getElementById('editText').focus();
}

// Confirm Edit
async function confirmEdit() {
    const newText = document.getElementById('editText').value.trim();

    if (!newText) {
        updateStatus('Message cannot be empty', 'error');
        return;
    }

    try {
        updateStatus('Updating...', '');
        await axios.put(`${API_BASE_URL}/messages/${currentMessageId}`, {
            text: newText
        });
        cancelEdit();
        updateStatus('Message updated ✓', 'success');
    } catch (error) {
        console.error('Error updating message:', error);
        updateStatus('Failed to update message', 'error');
    }
}

// Cancel Edit
function cancelEdit() {
    document.getElementById('editModal').classList.remove('active');
    currentMessageId = null;
    document.getElementById('editText').value = '';
}

// Delete Message
async function deleteMessage(messageId) {
    if (!confirm('Are you sure you want to delete this message?')) {
        return;
    }

    try {
        updateStatus('Deleting...', '');
        await axios.delete(`${API_BASE_URL}/messages/${messageId}`);
        updateStatus('Message deleted ✓', 'success');
    } catch (error) {
        console.error('Error deleting message:', error);
        updateStatus('Failed to delete message', 'error');
    }
}

// Update Status Message
function updateStatus(message, className) {
    const statusElement = document.getElementById('status');
    statusElement.textContent = message;
    statusElement.className = 'status ' + (className || '');
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    const modal = document.getElementById('editModal');
    if (e.target === modal) {
        cancelEdit();
    }
});
