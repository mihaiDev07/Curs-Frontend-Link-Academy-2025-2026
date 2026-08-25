const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const uploadUserPhoto = require("../middleware/uploadUserPhoto");
const { readUsers, writeUsers, sanitizeUser } = require("../services/usersService");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_change_me";

function generateToken(user) {
    return jwt.sign(
        {
            sub: user.id,
            email: user.email,
            name: user.name,
            surname: user.surname,
            role: user.role || "client",
        },
        JWT_SECRET,
        { expiresIn: "7d" },
    );
}

router.post("/register", uploadUserPhoto.single("photo"), async (req, res, next) => {
    try {
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
            role: "client",
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
    } catch (error) {
        return next(error);
    }
});

router.post("/login", async (req, res, next) => {
    try {
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
    } catch (error) {
        return next(error);
    }
});

router.get("/health", (_req, res) => {
    res.json({ status: "ok" });
});

module.exports = router;
