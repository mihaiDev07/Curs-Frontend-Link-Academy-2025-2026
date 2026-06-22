// server.js
const express = require("express");

const app = express();
const PORT = 3000;

const allowedOrigins = new Set([
    "https://127.0.0.1:5500",
    "http://127.0.0.1:5500",
    "http://localhost:5500",
    "https://localhost:5500",
]);

app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (origin && allowedOrigins.has(origin)) {
        res.set("Access-Control-Allow-Origin", origin);
    }
    res.set("Vary", "Origin");
    res.set("Access-Control-Allow-Methods", "GET,OPTIONS");
    res.set("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        return res.sendStatus(204);
    }

    next();
});

app.get("/api/bnr", async (req, res) => {
    try {
        const response = await fetch("https://www.bnr.ro/nbrfxrates.xml");
        if (!response.ok) {
            return res.status(502).send("Eroare la preluarea datelor de la BNR");
        }

        const xml = await response.text();
        res.set("Content-Type", "application/xml; charset=utf-8");
        res.send(xml);
    } catch (err) {
        res.status(500).send("Eroare server");
    }
});

app.listen(PORT, () => {
    console.log(`Proxy BNR pornit pe http://localhost:${PORT}`);
});