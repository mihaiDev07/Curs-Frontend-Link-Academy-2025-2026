const http = require("http");
const fs = require("fs");
const path = require("path");

const port = Number(process.env.PORT) || 5173;
const rootDirectory = __dirname;

const contentTypes = {
    ".css": "text/css; charset=utf-8",
    ".html": "text/html; charset=utf-8",
    ".ico": "image/x-icon",
    ".jpeg": "image/jpeg",
    ".jpg": "image/jpeg",
    ".js": "text/javascript; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".png": "image/png",
    ".svg": "image/svg+xml; charset=utf-8",
    ".webp": "image/webp",
};

function sendFile(res, filePath) {
    fs.readFile(filePath, (error, content) => {
        if (error) {
            res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
            res.end("Internal Server Error");
            return;
        }

        const extension = path.extname(filePath).toLowerCase();
        res.writeHead(200, {
            "Content-Type": contentTypes[extension] || "application/octet-stream",
        });
        res.end(content);
    });
}

const server = http.createServer((req, res) => {
    const requestPath = decodeURIComponent((req.url || "/").split("?")[0]);
    const relativePath = requestPath.replace(/^\/+/, "");
    const requestedFile = path.resolve(rootDirectory, relativePath);
    const isInsideRoot =
        requestedFile === rootDirectory || requestedFile.startsWith(`${rootDirectory}${path.sep}`);

    if (!isInsideRoot) {
        res.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
        res.end("Forbidden");
        return;
    }

    fs.stat(requestedFile, (error, stats) => {
        if (!error && stats.isFile()) {
            sendFile(res, requestedFile);
            return;
        }

        // React Router routes must fall back to the application entry point.
        sendFile(res, path.join(rootDirectory, "index.html"));
    });
});

server.listen(port, () => {
    console.log(`Frontend available at http://localhost:${port}`);
});
