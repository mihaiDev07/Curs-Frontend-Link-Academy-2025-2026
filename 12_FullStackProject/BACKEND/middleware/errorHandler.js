const multer = require("multer");

function errorHandler(error, _req, res, _next) {
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
}

module.exports = errorHandler;
