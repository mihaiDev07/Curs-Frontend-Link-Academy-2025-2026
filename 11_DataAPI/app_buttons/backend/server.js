const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Calea către fișierul log
const logFile = path.join(__dirname, 'clicks.log');

// Inițializează fișierul log dacă nu există
function initializeLogFile() {
    if (!fs.existsSync(logFile)) {
        const initialData = JSON.stringify({
            button1: 0,
            button2: 0,
            createdAt: new Date().toISOString()
        }, null, 2);
        fs.writeFileSync(logFile, initialData, 'utf8');
    }
}

// Citește datele din fișierul log
function getClicks() {
    try {
        const data = fs.readFileSync(logFile, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Eroare la citirea fișierului log:', error);
        return { button1: 0, button2: 0 };
    }
}

// Salvează datele în fișierul log
function saveClicks(data) {
    const logData = {
        button1: data.button1,
        button2: data.button2,
        lastUpdated: new Date().toISOString()
    };
    fs.writeFileSync(logFile, JSON.stringify(logData, null, 2), 'utf8');
}

// Rute
// GET - Obține numărul de clickuri
app.get('/api/clicks', (req, res) => {
    const clicks = getClicks();
    res.json({
        button1: clicks.button1,
        button2: clicks.button2
    });
});

// POST - Înregistrează click pe buton 1
app.post('/api/click/button1', (req, res) => {
    const clicks = getClicks();
    clicks.button1++;
    saveClicks(clicks);

    // Log în consolă
    console.log(`[${new Date().toLocaleString()}] Buton 1 - Click #${clicks.button1}`);

    res.json({
        button1: clicks.button1,
        button2: clicks.button2,
        message: 'Click pe Buton 1 înregistrat'
    });
});

// POST - Înregistrează click pe buton 2
app.post('/api/click/button2', (req, res) => {
    const clicks = getClicks();
    clicks.button2++;
    saveClicks(clicks);

    // Log în consolă
    console.log(`[${new Date().toLocaleString()}] Buton 2 - Click #${clicks.button2}`);

    res.json({
        button1: clicks.button1,
        button2: clicks.button2,
        message: 'Click pe Buton 2 înregistrat'
    });
});

// POST - Resetează contoarele (opțional)
app.post('/api/reset', (req, res) => {
    saveClicks({ button1: 0, button2: 0 });
    console.log(`[${new Date().toLocaleString()}] Contoare resetate`);
    res.json({
        button1: 0,
        button2: 0,
        message: 'Contoare resetate cu succes'
    });
});

// Rută de bază
app.get('/', (req, res) => {
    res.json({
        message: 'Backend pentru aplicația de numărare clickuri',
        version: '1.0.0'
    });
});

// Inițializează serverul
app.listen(PORT, () => {
    initializeLogFile();
    console.log(`✓ Server rulează pe http://localhost:${PORT}`);
    console.log(`✓ Fișierul log: ${logFile}`);
});
