import { products, user, cart } from "./ass01.js";

// ---------------- Debug ----------------

console.log("Produse:", products);
console.log("User:", user);
console.log(
  "Totalul cosului de cumparaturi in acest moment:",
  cart.totalPrice(),
  "RON",
);

// ---------------- Functions ----------------

//Verificarea stocului produsului
const isInStock = (product, requestedQty) => product.quantity >= requestedQty;

console.log("-----------Verificarea stocului produsului------------");

console.log(isInStock(products[0], 25));
console.log(isInStock(products[1], 25));
console.log(isInStock(products[2], 25));

function getProductById(productId) {
  return products.find((product) => product.id === productId);
}

//Adăugarea în coș
function addToCart(cart, product, qty) {
  if (!isInStock(product, qty)) {
    console.log(`❌ Stoc insuficient pentru ${product.name}`);
    return false;
  }

  const existingItem = cart.items.find((item) => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += qty;
  } else {
    cart.items.push({
      id: product.id,
      name: product.name,
      price: product.price,
      category: product.category,
      quantity: qty,
    });
  }

  product.quantity -= qty;

  console.log(`✅ ${qty} x ${product.name} adăugat în coș`);
  return true;
}
console.log("-----------Adăugarea în coș------------");

addToCart(cart, products[0], 10);
console.log(
  "Totalul cosului de cumparaturi in acest moment:",
  cart.totalPrice(),
  "RON",
);
addToCart(cart, products[1], 10);
console.log(
  "Totalul cosului de cumparaturi in acest moment:",
  cart.totalPrice(),
  "RON",
);
addToCart(cart, products[2], 10);
console.log(
  "Totalul cosului de cumparaturi in acest moment:",
  cart.totalPrice(),
  "RON",
);

//Eliminarea din coș
function removeFromCart(cart, productId) {
  const index = cart.items.findIndex((item) => item.id === productId);

  if (index === -1) {
    console.log(`Produsul cu id ${productId} nu exista in cos.`);
    return false;
  }

  const removedItem = cart.items[index];

  // ștergere
  cart.items.splice(index, 1);

  // returnare stoc
  const product = getProductById(productId);
  if (product) {
    product.quantity += removedItem.quantity;
  }

  console.log(`Produsul ${removedItem.name} a fost eliminat din cos.`);
  return true;
}

console.log("-----------Eliminarea din coș------------");

removeFromCart(cart, 1);
console.log(
  "Totalul cosului de cumparaturi in acest moment:",
  cart.totalPrice(),
  "RON",
);
removeFromCart(cart, 2);
console.log(
  "Totalul cosului de cumparaturi in acest moment:",
  cart.totalPrice(),
  "RON",
);
removeFromCart(cart, 3);
console.log(
  "Totalul cosului de cumparaturi in acest moment:",
  cart.totalPrice(),
  "RON",
);
removeFromCart(cart, 4);
console.log(
  "Totalul cosului de cumparaturi in acest moment:",
  cart.totalPrice(),
  "RON",
);

// Produse ieftine (arrow)
const getCheapProducts = (products, limit) =>
  products.filter((product) => product.price < limit);

console.log("-----------Produse ieftine------------");
console.log("Cheap:", getCheapProducts(products, 100));

// Căutare după categorie (funcție anonimă)

function getProductsByCategory(products, category) {
  return products.filter(function (p) {
    if (p.category === category) {
      console.log(`Acest produs face parte din categoria "${category}"`);
    }

    return p.category === category;
  });
}
console.log("-----------Cautare dupa categorie------------");

console.log(getProductsByCategory(products, "clothes"));
console.log(getProductsByCategory(products, "food"));
console.log(getProductsByCategory(products, "fitness"));
