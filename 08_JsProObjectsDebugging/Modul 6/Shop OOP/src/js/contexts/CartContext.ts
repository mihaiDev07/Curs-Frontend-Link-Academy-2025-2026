export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
}

export type CartProduct = Product & {
  quantity: number;
};

export class CartContext {
  cart: CartProduct[];
  listeners: Array<(cart: CartProduct[]) => void>;

  constructor() {
    this.cart = [];
    this.listeners = [];
  }

  getCart(): CartProduct[] {
    return this.cart;
  }

  //for product list
  addProduct(item: Product | CartProduct) {
    const found = this.cart.find((product) => product.id === item.id);
    if (found) {
      this.cart = this.cart.map((product) => {
        if (product.id === item.id) {
          return {
            ...product,
            quantity: product.quantity + 1,
          };
        } else {
          return product;
        }
      });
    } else {
      this.cart.push({
        ...item,
        quantity: 1,
      });
    }
    console.log("cart", this.cart);
    console.log("nr. produse", this.countItem());
    this.notifyListeners();
  }

  rmvProduct(item: Product | CartProduct) {
    const found = this.cart.find((product) => product.id === item.id);
    if (found) {
      this.cart = this.cart.map((product) => {
        if (product.id === item.id) {
          return {
            ...product,
            quantity: Math.max(0, product.quantity - 1),
          };
        } else {
          return product;
        }
      });
    } else {
      this.cart.push({
        ...item,
        quantity: 1,
      });
    }
    this.notifyListeners();
  }

  deleteItem(item: Product | CartProduct) {
    this.cart = this.cart.filter((product) => product.id !== item.id);
    this.notifyListeners();
  }

  priceSum(): number {
    return this.cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  }

  countItem(): number {
    return this.cart.reduce((total, item) => total + item.quantity, 0);
  }

  // Subscribe (abonare) se referă la procesul prin care un
  // obiect se înregistrează pentru a primi notificări despre anumite evenimente.
  subscribe(listener: (cart: CartProduct[]) => void) {
    console.log("Component subscribed");

    this.listeners.push(listener);
    console.log(this.listeners);
  }

  // Un listener (ascultător) este o funcție care așteaptă și reacționează la un anumit eveniment.
  notifyListeners() {
    console.log("notify");
    this.listeners.forEach((listener) => listener(this.cart));
  }
}
