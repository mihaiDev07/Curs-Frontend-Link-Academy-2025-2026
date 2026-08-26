// Metoda 1 <=> console din VSCode
// in terminal rulam comanda: node
// apoi global
// appi global.process sau process
//  24+46

// ca sa iesim process.exit() sau Ctrl +C

// Metoda 2 <=> script din VSCode

// 1. definim o functie
let adunare = (a, b) => {
    return a + b;
}

// 2. apelam functia
console.log("Suma dintre 24 si 46 este", adunare(24, 46));

// 3. in terminal rulam comanda: node ex1.js sau nodemon ex1.js daca modulul nodemon este instalat