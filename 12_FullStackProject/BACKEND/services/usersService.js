const fsPromises = require("fs/promises");
const path = require("path");

const USERS_FILE = path.join(__dirname, "..", "users.json");

async function readUsers() {
    try {
        const fileContent = await fsPromises.readFile(USERS_FILE, "utf-8");
        const users = JSON.parse(fileContent);
        return Array.isArray(users) ? users : [];
    } catch (error) {
        if (error.code === "ENOENT") {
            await fsPromises.writeFile(USERS_FILE, "[]", "utf-8");
            return [];
        }

        throw error;
    }
}

async function writeUsers(users) {
    await fsPromises.writeFile(USERS_FILE, JSON.stringify(users, null, 2), "utf-8");
}

function sanitizeUser(user) {
    const storedPhoto = typeof user.photo === "string" ? user.photo : "";
    const role = typeof user.role === "string" ? user.role : "client";
    const isExternalOrAbsolute =
        storedPhoto.startsWith("http://") ||
        storedPhoto.startsWith("https://") ||
        storedPhoto.startsWith("/");

    return {
        id: user.id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        role,
        photo: storedPhoto
            ? isExternalOrAbsolute
                ? storedPhoto
                : `/uploads/users/${storedPhoto}`
            : "",
        createdAt: user.createdAt,
    };
}

module.exports = {
    readUsers,
    writeUsers,
    sanitizeUser,
};
