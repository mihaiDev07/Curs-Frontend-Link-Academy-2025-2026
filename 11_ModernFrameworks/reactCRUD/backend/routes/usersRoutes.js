const express = require("express");

const authenticateToken = require("../middleware/authenticateToken");
const authorizeRole = require("../middleware/authorizeRole");
const { readUsers, writeUsers, sanitizeUser } = require("../services/usersService");

const router = express.Router();

function canManageUser(req, targetUserId) {
    const actorId = Number(req.user?.sub);
    const actorRole = req.user?.role;

    return actorRole === "admin" || actorId === targetUserId;
}

router.get("/", authenticateToken, authorizeRole("admin"), async (_req, res, next) => {
    try {
        const users = await readUsers();
        return res.json(users.map(sanitizeUser));
    } catch (error) {
        return next(error);
    }
});

router.get("/:id", authenticateToken, async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        if (!Number.isInteger(id)) {
            return res.status(400).json({ message: "Id utilizator invalid." });
        }

        if (!canManageUser(req, id)) {
            return res.status(403).json({ message: "Acces interzis." });
        }

        const users = await readUsers();
        const user = users.find((item) => item.id === id);

        if (!user) {
            return res.status(404).json({ message: "Utilizatorul nu a fost gasit." });
        }

        return res.json(sanitizeUser(user));
    } catch (error) {
        return next(error);
    }
});

router.put("/:id", authenticateToken, async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const { name, surname, email } = req.body;

        if (!Number.isInteger(id)) {
            return res.status(400).json({ message: "Id utilizator invalid." });
        }

        if (!canManageUser(req, id)) {
            return res.status(403).json({ message: "Acces interzis." });
        }

        if (
            !name ||
            !surname ||
            !email ||
            typeof name !== "string" ||
            typeof surname !== "string" ||
            typeof email !== "string"
        ) {
            return res.status(400).json({ message: "Date invalide." });
        }

        const normalizedEmail = email.trim().toLowerCase();
        const users = await readUsers();
        const index = users.findIndex((item) => item.id === id);

        if (index === -1) {
            return res.status(404).json({ message: "Utilizatorul nu a fost gasit." });
        }

        const duplicatedEmail = users.find(
            (item) => item.id !== id && item.email === normalizedEmail,
        );
        if (duplicatedEmail) {
            return res.status(409).json({ message: "Exista deja un cont cu acest email." });
        }

        users[index] = {
            ...users[index],
            name: name.trim(),
            surname: surname.trim(),
            email: normalizedEmail,
        };

        await writeUsers(users);
        return res.json(sanitizeUser(users[index]));
    } catch (error) {
        return next(error);
    }
});

router.delete("/:id", authenticateToken, authorizeRole("admin"), async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        if (!Number.isInteger(id)) {
            return res.status(400).json({ message: "Id utilizator invalid." });
        }

        const users = await readUsers();
        const index = users.findIndex((item) => item.id === id);

        if (index === -1) {
            return res.status(404).json({ message: "Utilizatorul nu a fost gasit." });
        }

        users.splice(index, 1);
        await writeUsers(users);
        return res.status(204).send();
    } catch (error) {
        return next(error);
    }
});

module.exports = router;
