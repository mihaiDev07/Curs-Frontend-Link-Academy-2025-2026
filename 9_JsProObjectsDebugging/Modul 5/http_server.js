// Cand dorim sa importam un modul in aplicatia noastra 
// folosim  require ('nume_modul');

const http = require('http');  // includem modulul http
const port = 3001;  // setam un port pentru server ( Recomandate: diferit de 80, 443, 8080)
const host = 'localhost'
// Start server 
// req - cererile catre seerver: requests
// res - raspunsurile serverului: responses
let server = http.createServer(function (req, res) {
    res.writeHead(
        200,  // setam header: status cod si tip continut
        {
            'Content-Type': 'text/html',
            'Access-Control-Allow-Origin': '*',
        },
    );
    // putem trimite orice tip de continut, in acest caz HTML
    const html = `
<!DOCTYPE html>
<html lang="ro">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Server HTTP</title>
</head>
<body>
    <h1>Hello World!</h1>
    <!-- putem adauga orice continut HTML dorim -->
    <p>Acesta este un raspuns HTML trimis de serverul Node.js.</p>
</body>
</html>`;

    res.write(html); // Response content
    res.end(); // End response
});
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});

// 1. pornim serverul
// node http_server.js 
// 2. accesam in browser
// http://localhost:3001

// putem opri serverul : ctrl+c