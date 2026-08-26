const express = require("express");
const cors = require("cors");
const fs = require("fs/promises");
const fsSync = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_change_me";
const USERS_FILE = path.join(__dirname, "users.json");
const UPLOADS_DIR = path.join(__dirname, "uploads", "users");
const MAX_FILE_SIZE = 2 * 1024 * 1024;
const ALLOWED_MIME_TYPES = new Set([
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
]);

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        fsSync.mkdirSync(UPLOADS_DIR, { recursive: true });
        cb(null, UPLOADS_DIR);
    },
    filename: (_req, file, cb) => {
        const extension = path.extname(file.originalname).toLowerCase();
        const safeExtension = extension || ".jpg";
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${safeExtension}`;
        cb(null, uniqueName);
    },
});

const upload = multer({
    storage,
    limits: { fileSize: MAX_FILE_SIZE },
    fileFilter: (_req, file, cb) => {
        if (!ALLOWED_MIME_TYPES.has(file.mimetype)) {
            cb(new Error("Tipul fisierului nu este acceptat."));
            return;
        }

        cb(null, true);
    },
});

app.use(
    cors({
        origin: ["http://localhost:5173", "http://localhost:5180"],
    }),
);
app.use(express.json({ limit: "5mb" }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

async function readUsers() {
    try {
        const fileContent = await fs.readFile(USERS_FILE, "utf-8");
        const users = JSON.parse(fileContent);
        return Array.isArray(users) ? users : [];
    } catch (error) {
        if (error.code === "ENOENT") {
            await fs.writeFile(USERS_FILE, "[]", "utf-8");
            return [];
        }

        throw error;
    }
}

async function writeUsers(users) {
    await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2), "utf-8");
}

function generateToken(user) {
    return jwt.sign(
        {
            sub: user.id,
            email: user.email,
            name: user.name,
            surname: user.surname,
        },
        JWT_SECRET,
        { expiresIn: "7d" },
    );
}

function sanitizeUser(user) {
    const storedPhoto = typeof user.photo === "string" ? user.photo : "";
    const isExternalOrAbsolute =
        storedPhoto.startsWith("http://") ||
        storedPhoto.startsWith("https://") ||
        storedPhoto.startsWith("/");

    return {
        id: user.id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        photo: storedPhoto
            ? isExternalOrAbsolute
                ? storedPhoto
                : `/uploads/users/${storedPhoto}`
            : "",
        createdAt: user.createdAt,
    };
}

app.post("/auth/register", upload.single("photo"), async (req, res) => {
    const { name, surname, email, password, repeatPassword } = req.body;

    if (
        !name ||
        !surname ||
        !email ||
        !password ||
        !repeatPassword ||
        typeof name !== "string" ||
        typeof surname !== "string" ||
        typeof email !== "string" ||
        typeof password !== "string" ||
        typeof repeatPassword !== "string"
    ) {
        return res.status(400).json({ message: "Date invalide." });
    }

    if (password.length < 6) {
        return res
            .status(400)
            .json({ message: "Parola trebuie sa aiba minim 6 caractere." });
    }

    if (password !== repeatPassword) {
        return res.status(400).json({ message: "Parolele nu coincid." });
    }

    if (!req.file) {
        return res.status(400).json({ message: "Poza este obligatorie." });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const users = await readUsers();
    const existingUser = users.find((user) => user.email === normalizedEmail);

    if (existingUser) {
        return res.status(409).json({ message: "Exista deja un cont cu acest email." });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = {
        id: Date.now(),
        name: name.trim(),
        surname: surname.trim(),
        email: normalizedEmail,
        passwordHash,
        photo: req.file.filename,
        createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    await writeUsers(users);

    const token = generateToken(newUser);

    return res.status(201).json({
        message: "Cont creat cu succes.",
        token,
        user: sanitizeUser(newUser),
    });
});

app.post("/auth/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password || typeof email !== "string" || typeof password !== "string") {
        return res.status(400).json({ message: "Emailul si parola sunt obligatorii." });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const users = await readUsers();
    const user = users.find((item) => item.email === normalizedEmail);

    if (!user) {
        return res.status(401).json({ message: "Email sau parola invalide." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
        return res.status(401).json({ message: "Email sau parola invalide." });
    }

    const token = generateToken(user);

    return res.json({
        message: "Autentificare reusita.",
        token,
        user: sanitizeUser(user),
    });
});

app.get("/auth/health", (_req, res) => {
    res.json({ status: "ok" });
});

app.use((error, _req, res, _next) => {
    if (error instanceof multer.MulterError) {
        if (error.code === "LIMIT_FILE_SIZE") {
            return res.status(400).json({ message: "Poza este prea mare. Maxim 2MB." });
        }

        return res.status(400).json({ message: "Upload invalid." });
    }

    if (error.message === "Tipul fisierului nu este acceptat.") {
        return res.status(400).json({ message: error.message });
    }

    console.error(error);
    return res.status(500).json({ message: "Eroare interna de server." });
});

app.listen(PORT, () => {
    console.log(`Auth backend running on http://localhost:${PORT}`);
});
