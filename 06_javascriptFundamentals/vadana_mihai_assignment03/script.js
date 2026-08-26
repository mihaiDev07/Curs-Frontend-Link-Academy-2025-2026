// Descrierea sarcinii :

// Sarcina voastră este să programați un set de funcții mici și utile în JavaScript care se vor executa prin clic pe butoane pe
// paginile unui proiect de e-commerce.

// Scop

// Scopul acestei sarcini este să aplicați conceptele cheie legate de lucrul cu șiruri și obiecte în JavaScript prin funcții practice
// folosite într-un mediu e-commerce.

// Sarcini :
//  Îmbunătățiți sarcina anterioară

//-------------------------   1   --------------------------------
// În sarcina anterioară ați folosit o variabilă RAW_COUPON care conținea un singur cupon valid (de exemplu, "SAVE10"). Acum extindeți
//  sarcina astfel încât să existe mai multe cupoane valide stocate într-un șir:

// În loc de o variabilă RAW_COUPON, definiți un șir VALID_COUPONS care să conțină cel puțin trei valori string,
//  de exemplu: "SAVE10", "SAVE15", "FREESHIP".
// Notă: Toate valorile din șir să fie scrise cu majuscule, fără spații, pentru a corespunde valorii returnate de funcția normalizeCoupon.

//-------------------------   2   --------------------------------
//  Creați o funcție care verifică dacă un cupon există în șir:

//     function isValidCoupon(code) {
//       // ...
//     }
// Parametrul code reprezintă cuponul deja normalizat (rezultatul funcției normalizeCoupon).
// Funcția trebuie să verifice dacă valoarea code se găsește în șirul VALID_COUPONS.
// Dacă se găsește, funcția trebuie să returneze true. Dacă nu, să returneze false.
// Notă: Este permis să folosiți o buclă (de exemplu, for sau for...of) sau metoda includes() pentru a parcurge șirul.

//-------------------------   3   --------------------------------
//  Modificați funcția validateAndNotify(), care trebuie în continuare:

// să citească valoarea din câmpul #promo-input;
// să apeleze normalizeCoupon(code) pentru această valoare;
// să verifice dacă cuponul este valid, apelând funcția isValidCoupon(code);
// să afișeze un mesaj corespunzător utilizatorului printr-o alertă.

//-------------------------   4   --------------------------------
//  Faceți ca pentru cupoanele diferite să fie afișate mesaje diferite, de exemplu:
// "SAVE10" → "Cuponul dvs. oferă 10% reducere."
// "SAVE15" → "Cuponul dvs. oferă 15% reducere."
// "FREESHIP" → "Cuponul dvs. oferă livrare gratuită."

const VALID_COUPONS = ["SAVE10", "SAVE15", "FREESHIP"];

function isValidCoupon(code) {
  return VALID_COUPONS.includes(code);
}

function normalizeCoupon(code) {
  return String(code).trim().toUpperCase();
}

function validateAndNotify() {
  const promoInput = document.getElementById("promo-input").value;
  const acceptCoupons = normalizeCoupon(promoInput);

  if (!isValidCoupon(acceptCoupons)) {
    alert("Codul introdus nu este valid.");
    return;
  }

  if (acceptCoupons === "SAVE10") {
    alert("Cuponul dvs. oferă 10% reducere.");
  } else if (acceptCoupons === "SAVE15") {
    alert("Cuponul dvs. oferă 15% reducere.");
  } else if (acceptCoupons === "FREESHIP") {
    alert("Cuponul dvs. oferă livrare gratuită.");
  }
}

//-------------------------   5   --------------------------------
//  Creați un șir asociativ allProducts cu:
// numele, prețul și cantitatea tuturor produselor din magazinul vostru e-commerce (suficient să aveți până la 10 produse).

//-------------------------   6   --------------------------------
//  Scrieți o funcție care calculează valoarea totală a tuturor produselor în stoc:
// pentru fiecare produs calculați price * qty;
// adunați toate valorile într-o variabilă totalValue;
// afișați în consolă, de exemplu: „Valoarea totală a stocului: 5420 USD”.

const allProducts = [
  { name: "T-Shirt", price: 30, qty: 15 },
  { name: "Jeans", price: 50, qty: 9 },
  { name: "Sneakers", price: 250, qty: 7 },
  { name: "Hat", price: 25, qty: 22 },
  { name: "Jacket", price: 80, qty: 3 },
  { name: "Coat", price: 225, qty: 5 },
  { name: "Blouse", price: 45, qty: 17 },
];

function calculateStockProducts(items) {
  let totalValue = 0;

  for (let product of items) {
    totalValue += product.price * product.qty;
  }

  return totalValue;
}

console.log(calculateStockProducts(allProducts));

//-------------------------   7   --------------------------------
//  Creați un nou șir lowStock care:
// conține doar produsele la care qty < 10;
// după ce ați format șirul lowStock, afișați-l în consolă.

let lowStock = [];

for (let i = 0; i < allProducts.length; i++) {
  if (allProducts[i].qty < 10) {
    lowStock.push(allProducts[i]);
  }
}
console.log(lowStock);
//-------------------------   8   --------------------------------
//  Căutare produs după nume – scrieți o funcție:
//     function findProductByName(list, searchName) {
//       // ...
//     }
// Căutarea trebuie să fie case-insensitive (să nu țină cont de majuscule/minuscule).
// Funcția returnează:
// obiectul produs găsit, dacă există;
// sau null dacă nu există niciun produs cu numele dat.
// Testați funcția în consolă.

function findProductByName(list, searchName) {
  for (let product of list) {
    if (product.name.toLowerCase().trim() === searchName.toLowerCase().trim()) {
      return product.name;
    }
  }
  return null;
}

console.log(findProductByName(allProducts, "jeans"));
console.log(findProductByName(allProducts, "Coat"));
console.log(findProductByName(allProducts, "glasses"));
console.log(findProductByName(allProducts, "Sneakers"));

//===================================================================================================================================
//===================================================================================================================================

// Sfaturi pentru realizarea cu succes a sarcinii :
//1.
//  Verificați dacă ați eliminat vechea variabilă RAW_COUPON ca să nu creeze confuzie.
//  Toate codurile din șir să fie: CU LITERE MARI, fără spații, deoarece funcția normalizeCoupon face exact asta cu
// inputul utilizatorului. Exemplu pentru autoverificare în consolă:
//     console.log(VALID_COUPONS);

//2.
//  Funcția isValidCoupon(code) – folosiți o buclă FOR pentru a parcurge toate cupoanele.
// Sau folosiți funcția includes(), care poate căuta în șir.

//3.
//  Modificarea funcției validateAndNotify(): cele mai frecvente greșeli sunt: uitarea apelului normalizeCoupon sau
// uitarea să transmiteți rezultatul normalizării către isValidCoupon.

//4.
//  Nu scrieți 3 if-uri complet separate împrăștiate prin cod.
// Variantele cele mai frecvente sunt blocurile if / else if / else.

//5.
//  Verificați întotdeauna mai întâi dacă cuponul este valid (înainte să căutați mesajul concret).

//6.
//  Șirul asociativ allProducts: verificați dacă toate elementele sunt între [ ], dacă între obiecte există virgulă,
//  dacă fiecare obiect are ACELEAȘI câmpuri (name, price, qty), nu să aveți uneori quantity, alteori qty.

//7.
//  La calcularea valorii totale a stocului, dacă obțineți NaN → înseamnă că undeva price sau qty nu sunt tratate ca
// numere (sau nu sunt scrise corect).

//8.
//  Sfat pentru findProductByName(list, searchName): normalizați atât numele produsului, cât și termenul de căutare
//  în același mod (de exemplu, toLowerCase().trim()), pentru a avea o căutare case-insensitive.

// ---------------------------------------------------------------------
