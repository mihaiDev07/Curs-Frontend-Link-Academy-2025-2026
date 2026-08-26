const express = require('express');
const WebSocket = require('ws');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Middleware
app.use(cors());
app.use(bodyParser.json());

// In-memory storage for messages
let messages = [];
let messageIdCounter = 1;

// Connected clients
const clients = new Set();

// Broadcast message to all connected clients
function broadcastMessage(data) {
    clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
        }
    });
}

// WebSocket connection handler
wss.on('connection', (ws) => {
    console.log('New client connected');
    clients.add(ws);

    // Send all existing messages to the new client
    ws.send(JSON.stringify({
        type: 'init',
        messages: messages
    }));

    ws.on('message', (data) => {
        console.log('Message received:', data);
    });

    ws.on('close', () => {
        console.log('Client disconnected');
        clients.delete(ws);
    });

    ws.on('error', (error) => {
        console.error('WebSocket error:', error);
    });
});

// REST API endpoints

// Get all messages
app.get('/api/messages', (req, res) => {
    res.json(messages);
});

// Add a new message
app.post('/api/messages', (req, res) => {
    const { username, text } = req.body;

    if (!username || !text) {
        return res.status(400).json({ error: 'Username and text are required' });
    }

    const newMessage = {
        id: messageIdCounter++,
        username,
        text,
        timestamp: new Date().toISOString()
    };

    messages.push(newMessage);

    // Broadcast to all WebSocket clients
    broadcastMessage({
        type: 'new_message',
        message: newMessage
    });

    res.json(newMessage);
});

// Edit a message
app.put('/api/messages/:id', (req, res) => {
    const messageId = parseInt(req.params.id);
    const { text } = req.body;

    const message = messages.find(m => m.id === messageId);

    if (!message) {
        return res.status(404).json({ error: 'Message not found' });
    }

    if (!text) {
        return res.status(400).json({ error: 'Text is required' });
    }

    message.text = text;
    message.edited = true;
    message.editedAt = new Date().toISOString();

    // Broadcast update to all WebSocket clients
    broadcastMessage({
        type: 'edit_message',
        message
    });

    res.json(message);
});

// Delete a message
app.delete('/api/messages/:id', (req, res) => {
    const messageId = parseInt(req.params.id);

    const index = messages.findIndex(m => m.id === messageId);

    if (index === -1) {
        return res.status(404).json({ error: 'Message not found' });
    }

    const deletedMessage = messages.splice(index, 1)[0];

    // Broadcast deletion to all WebSocket clients
    broadcastMessage({
        type: 'delete_message',
        messageId: messageId
    });

    res.json({ message: 'Message deleted', id: messageId });
});

// Serve static frontend files
app.use(express.static('../frontend'));

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
