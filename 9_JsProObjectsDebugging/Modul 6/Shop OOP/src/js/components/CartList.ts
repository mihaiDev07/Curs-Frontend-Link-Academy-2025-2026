import { Component } from "./Component";
import { CartItem } from "./CartItem";
import { CartContext, CartProduct } from "../contexts/CartContext";

interface CartListProps {
  cartContext: CartContext;
}

export class CartList extends Component<CartListProps> {
  state: { cart: CartProduct[] };
  cartListUl: HTMLElement | null;
  priceSumming: HTMLElement | null;
  itemCounting: HTMLElement | null;

  constructor(props: CartListProps) {
    super(props);
    this.state = { cart: [] };

    this.updateCart = this.updateCart.bind(this);
    this.props.cartContext.subscribe(this.updateCart);

    this.cartListUl = null;
    this.priceSumming = null;
    this.itemCounting = null;
  }

  updateCart(cart: CartProduct[]) {
    this.state.cart = cart;
    if (!this.cartListUl || !this.priceSumming || !this.itemCounting) {
      return;
    }

    this.cartListUl.innerHTML = ``;

    this.state.cart.forEach((item) => {
      const cartItem = new CartItem({
        item,
        cartContext: this.props.cartContext,
      });
      this.cartListUl.appendChild(cartItem.render());
    });

    this.priceSumming.textContent = `Total Price: $ ${this.props.cartContext.priceSum().toFixed(2)}`;
    this.itemCounting.textContent = `Total Items: ${this.props.cartContext.countItem()}`;
  }

  render(): HTMLElement {
    const cartListElement = document.createElement("div");
    cartListElement.className = "cart-list container";

    cartListElement.innerHTML = `

    <div class="align-cart">
      <h2 class="text-center mb-4">My Cart</h2>

      <!-- Header row for cart items -->
      <div class="row text-center fw-bold border-bottom pb-2 mb-3">
        <div class="col-6 col-md-4">Product</div>
        <div class="col-3 col-md-4">Quantity</div>
        <div class="col-3 col-md-4">Price</div>
      </div>

      <!-- Cart items -->
      <ul id="cart-item-ul" class="list-unstyled"></ul>
    </div>
    
    <!-- Total section -->
    <div class="total-div mt-4 p-3 border-top">
      <div class="row">
        <div class="col-6">
          <h3 id="total-price-text" class="text-start">Total Price: <span class="text-success"><i class="bi bi-currency-euro"></i> ${this.props.cartContext.priceSum().toFixed(2)}</span></h3>
        </div>
        <div class="col-6">
          <h3 id="total-items-text" class="text-end">Total Items: <span class="text-primary">${this.props.cartContext.countItem()}</span></h3>
        </div>
      </div>
    </div>
  
  `;
    this.cartListUl = cartListElement.querySelector("#cart-item-ul");
    this.priceSumming = cartListElement.querySelector("#total-price-text");
    this.itemCounting = cartListElement.querySelector("#total-items-text");

    return cartListElement;
  }
}
