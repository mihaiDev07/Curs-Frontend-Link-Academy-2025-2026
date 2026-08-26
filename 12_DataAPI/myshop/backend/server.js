const express = require('express');
const cookieParser = require('cookie-parser');
const fs = require('fs/promises');
const path = require('path');
const crypto = require('crypto');

const app = express();
const PORT = 3000;

const PRODUCTS_PATH = path.join(__dirname, 'products.json');
const USERS_PATH = path.join(__dirname, 'users.json');
const FRONTEND_PATH = path.join(__dirname, '..', 'frontend');

const sessions = new Map();

app.use(express.json());
app.use(cookieParser());

const allowedOrigins = new Set([
    'http://localhost:5500',
    'http://127.0.0.1:5500',
    'https://localhost:5500',
    'https://127.0.0.1:5500',
    'http://localhost:3000',
    'http://127.0.0.1:3000'
]);

app.use((req, res, next) => {
    const origin = req.headers.origin;

    if (origin && allowedOrigins.has(origin)) {
        res.header('Access-Control-Allow-Origin', origin);
        res.header('Vary', 'Origin');
        res.header('Access-Control-Allow-Credentials', 'true');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,OPTIONS');
    }

    if (req.method === 'OPTIONS') {
        return res.sendStatus(204);
    }

    next();
});

app.use(express.static(FRONTEND_PATH));

async function readJson(filePath) {
    const raw = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(raw);
}

async function writeJson(filePath, data) {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

function getUserFromCookie(req) {
    const token = req.cookies.auth_token;
    if (!token) return null;
    return sessions.get(token) || null;
}

function requireAuth(req, res, next) {
    const user = getUserFromCookie(req);
    if (!user) {
        return res.status(401).json({ message: 'Neautorizat. Te rugam sa te loghezi.' });
    }
    req.user = user;
    next();
}

app.get('/api/products', async (req, res) => {
    try {
        const products = await readJson(PRODUCTS_PATH);
        const { category } = req.query;
        if (!category) {
            return res.json(products);
        }
        const filtered = products.filter((p) =>
            (p.categorie || '').toLowerCase() === String(category).toLowerCase()
        );
        return res.json(filtered);
    } catch (error) {
        return res.status(500).json({ message: 'Nu am putut citi produsele.' });
    }
});

app.get('/api/products/:id', async (req, res) => {
    try {
        const productId = Number(req.params.id);
        const products = await readJson(PRODUCTS_PATH);
        const product = products.find((p) => p.id === productId);

        if (!product) {
            return res.status(404).json({ message: 'Produsul nu a fost gasit.' });
        }

        return res.json(product);
    } catch (error) {
        return res.status(500).json({ message: 'Eroare la citirea produsului.' });
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const { mail, parola } = req.body;
        const users = await readJson(USERS_PATH);

        const user = users.find((u) => u.mail === mail && u.parola === parola);
        if (!user) {
            return res.status(401).json({ message: 'Email sau parola incorecte.' });
        }

        const token = crypto.randomUUID();
        sessions.set(token, {
            id: user.id,
            nume: user.nume,
            prenume: user.prenume,
            mail: user.mail
        });

        res.cookie('auth_token', token, {
            httpOnly: true,
            sameSite: 'lax',
            maxAge: 1000 * 60 * 60 * 8
        });

        return res.json({
            message: 'Autentificare reusita.',
            user: {
                id: user.id,
                nume: user.nume,
                prenume: user.prenume,
                mail: user.mail
            }
        });
    } catch (error) {
        return res.status(500).json({ message: 'Eroare la login.' });
    }
});

app.post('/api/logout', (req, res) => {
    const token = req.cookies.auth_token;
    if (token) {
        sessions.delete(token);
    }

    res.clearCookie('auth_token');
    return res.json({ message: 'Logout reusit.' });
});

app.get('/api/me', (req, res) => {
    const user = getUserFromCookie(req);
    if (!user) {
        return res.status(401).json({ loggedIn: false });
    }

    return res.json({ loggedIn: true, user });
});

app.post('/api/products', requireAuth, async (req, res) => {
    try {
        const { nume, descriere, pret, poza, categorie } = req.body;
        if (!nume || !descriere || !pret || !poza || !categorie) {
            return res.status(400).json({ message: 'Toate campurile sunt obligatorii.' });
        }

        const products = await readJson(PRODUCTS_PATH);
        if (products.length >= 30) {
            return res.status(400).json({ message: 'Limita maxima de 30 produse a fost atinsa.' });
        }

        const newId = products.length ? Math.max(...products.map((p) => p.id)) + 1 : 1;
        const newProduct = {
            id: newId,
            nume,
            descriere,
            pret: Number(pret),
            poza,
            categorie
        };

        products.push(newProduct);
        await writeJson(PRODUCTS_PATH, products);

        return res.status(201).json(newProduct);
    } catch (error) {
        return res.status(500).json({ message: 'Nu am putut adauga produsul.' });
    }
});

app.put('/api/products/:id', requireAuth, async (req, res) => {
    try {
        const productId = Number(req.params.id);
        const { nume, descriere, pret, poza, categorie } = req.body;

        const products = await readJson(PRODUCTS_PATH);
        const index = products.findIndex((p) => p.id === productId);

        if (index === -1) {
            return res.status(404).json({ message: 'Produsul nu exista.' });
        }

        const current = products[index];
        products[index] = {
            ...current,
            nume: nume ?? current.nume,
            descriere: descriere ?? current.descriere,
            pret: pret !== undefined ? Number(pret) : current.pret,
            poza: poza ?? current.poza,
            categorie: categorie ?? current.categorie
        };

        await writeJson(PRODUCTS_PATH, products);
        return res.json(products[index]);
    } catch (error) {
        return res.status(500).json({ message: 'Nu am putut actualiza produsul.' });
    }
});

app.get('/health', (req, res) => {
    res.json({ ok: true });
});

app.listen(PORT, () => {
    console.log(`MyShop backend ruleaza la http://localhost:${PORT}`);
});
