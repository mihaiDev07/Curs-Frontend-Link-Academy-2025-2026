// 1. Definiți următoarele constante/variabile:

// PRODUCT1_NAME (string), PRODUCT1_PRICE (număr în RON), PRODUCT1_QTY (număr întreg ≥ 0)
// PRODUCT2_NAME, PRODUCT2_PRICE, PRODUCT2_QTY
// VAT_RATE (de exemplu, 0.2), CURRENCY (string: "USD" sau "EUR"), USD_PER_EUR (de exemplu, 1.16)
// RAW_COUPON cu valoarea SAVE10.
// Afișați tipurile acestor variabile folosind typeof (cel puțin 3 exemple în comentarii sau prin console.log).

const PRODUCT1_NAME = "Sneakers";
const PRODUCT2_NAME = "Shirt";

let PRODUCT1_PRICE = 450;
let PRODUCT2_PRICE = 120;

let PRODUCT1_QTY = 15;
let PRODUCT2_QTY = 30;

let VAT_RATE = 0.2;
const CURRENCY = "EUR";

const RAW_COUPON = "SAVE10";

console.log(typeof PRODUCT1_NAME);
console.log(typeof PRODUCT2_NAME);

console.log(typeof PRODUCT1_PRICE);
console.log(typeof PRODUCT2_PRICE);

console.log(typeof PRODUCT1_QTY);
console.log(typeof PRODUCT2_QTY);

console.log(typeof VAT_RATE);
console.log(typeof CURRENCY);

console.log(typeof RAW_COUPON);

// 2. Faceți o funcție normalizeCoupon(code) care:

// elimină spațiile de la început și sfârșit, dacă există, din valoarea stocată în variabila code, folosind funcția trim();
// transformă conținutul variabilei code în majuscule.
// Ca valoare returnează cuponul modificat.

function normalizeCoupon(code) {
  return String(code).trim().toUpperCase();
}

// 3. În secțiunea Order Summary de pe pagina Your Cart adăugați un formular cu:

// un câmp de input (placeholder: „Add promo code”) și un buton „Apply”.

// 4. Validarea cuponului – creați o nouă funcție validateAndNotify() care:

// citește valoarea din câmpul #promo-input;
// apelează normalizeCoupon(code) asupra acestui input;
// folosește o condiție pentru a verifica dacă cuponul este valid;
// afișează un mesaj de alertă:
// dacă codul este valid: „Codul introdus este valid.”
// dacă codul nu este valid: „Codul introdus nu este valid.”
// Notă despre codurile valide: Pentru acest exercițiu, considerați că un cod este valid
// dacă este egal cu conținutul variabilei RAW_COUPON.

function validateAndNotify() {
  const promoInput = document.getElementById("promo-input").value;
  if (normalizeCoupon(promoInput) === RAW_COUPON) {
    alert("CODUL INTRODUS ESTE VALID.");
  } else {
    alert("Codul introdus nu este valid");
  }
}

// 5. Autentificarea utilizatorului – Scrieți o funcție login() care:

// preia valorile din câmpurile email și password de pe pagina HTML;
// elimină spațiile de la început și sfârșit din ambele intrări (folosind trim());
// face o comparație sensibilă case-sensitive (trebuie să fie exact "admin" și "admin"),
// returnează true dacă ambele condiții sunt îndeplinite, altfel false.
// Rezultate așteptate (exemple)

// login("admin", "admin") → true
// login(" admin ", "admin") → true (datorită lui trim)
// login("Admin", "admin") → false (case-sensitive)
// login("admin", " ADMIN ") → false
// login("", "") → false

function login() {
  const loginInput = document.getElementById("login-email-input").value;
  const passwordInput = document.getElementById("login-password-input").value;

  if (loginInput.trim() === "admin" && passwordInput.trim() === "admin") {
    alert(true);
  } else {
    alert(false);
  }
}

// 7. Urmăriți suma totală a cumpărăturilor

// Pe pagina View All Products trebuie să mențineți o variabilă globală pentru suma totală a cumpărăturilor în dolari.
//  De fiecare dată când utilizatorul dă clic pe butonul Add to Cart pentru un produs, suma totală trebuie să crească
//  cu prețul acelui produs. Sarcina voastră este:

// În partea de sus a fișierului JavaScript definiți o variabilă globală:
//     let suma = 0;
// Scrieți o funcție care primește prețul produsului ca parametru și îl adaugă la suma globală:
//     function adaugăLaSumă(preț) {  }
// Demonstrați funcționarea funcției cu cel puțin trei apeluri (pentru trei prețuri diferite) și afișați
// rezultatul după fiecare apel folosind console.log.
// Conectați funcția la butoanele Add to Cart din HTML folosind evenimentul onClick, astfel încât la fiecare
// clic pe buton funcția să mărească automat suma totală cu prețul produsului corespunzător.

let sum = 0;

function adaugaLaSuma(pret) {
  sum += pret;
  console.log(`$ ${sum}`);
  return sum;
}

// 8. Afișarea sumei totale prin pictograma coș:

// Pe site există o pictogramă coș în header. Cu clic pe această pictogramă trebuie să se afișeze
//  o alertă cu suma totală curentă a comenzii (în $).

function openCart() {
  alert(`Total de plata $ ${sum}`);
}
