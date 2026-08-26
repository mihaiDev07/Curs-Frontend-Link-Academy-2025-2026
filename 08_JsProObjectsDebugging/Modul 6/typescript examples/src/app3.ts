type Product = {
  name: string;
  price: number;
  category: {
    id: number;
    title: string;
  };
};

type Cart = {
  cartId: number;
  createdAt: string;
  products: Product[];
};

let cart1: Cart = {
  cartId: 1,
  createdAt: "2026-04-28",
  products: [{ name: "Mouse", price: 50, category: { id: 1, title: "tech" } }],
};

console.log(cart1);
console.log(cart1.products);
