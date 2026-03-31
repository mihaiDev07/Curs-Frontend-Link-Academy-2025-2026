// ------------- Product ------------

function Product(id, name, price, quantity, category) {
  this.id = id;
  this.name = name;
  this.price = price;
  this.quantity = quantity;
  this.category = category;
}

const product1 = new Product(1, "Shirt", 70, 15, "clothes");
const product2 = new Product(2, "Bike", 750, 7, "fitness");
const product3 = new Product(3, "Mascara", 50, 30, "makeup");

export const products = [product1, product2, product3];

// ------------- User ------------

export const user = {
  username: "Mihai",
  email: "mihaiDev@gmail.com",
  isLoggedIn: false,
};

// ------------- Cart ------------

export const cart = {
  items: [],

  totalPrice: function () {
    return this.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  },
};
