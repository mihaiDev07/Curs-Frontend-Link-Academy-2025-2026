import { Component } from "./Component";
import { CartContext, Product } from "../contexts/CartContext";

interface ProductItemProps {
  product: Product;
  cartContext: CartContext;
}

export class ProductItem extends Component<ProductItemProps> {
  constructor(props: ProductItemProps) {
    super(props);
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.handleViewDetails = this.handleViewDetails.bind(this);
  }
  handleAddToCart(event: Event) {
    event.preventDefault();
    this.props.cartContext.addProduct(this.props.product);
    console.log("adauga in cos", this.props.cartContext.cart);
  }

  handleViewDetails(event: Event) {
    event.preventDefault();
  }

  render(): HTMLElement {
    const product = document.createElement("div");
    product.className = "col mb-3";
    // console.log(this.props.product.id);

    product.innerHTML = `
        <div class="card h-100">
            <!-- Sale badge-->
            <div class="badge bg-dark text-white position-absolute" style="top: 0.5rem; right: 0.5rem">Sale</div>
            <!-- Product image-->
            <img class="card-img-top" src="${this.props.product.image}" alt="...">
            <!-- Product details-->
            <div class="card-body p-4">
                <div class="text-center">
                    <!-- Product name-->
                    <h5 class="fw-bolder">${this.props.product.id} ${this.props.product.title}</h5>
                    <!-- Product price-->
                    <i class="bi bi-currency-euro"></i> ${this.props.product.price.toFixed(2)}
                </div>
            </div>
            <!-- Product actions-->
            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent d-flex justify-content-between ">
                <a class="btn btn-outline-dark" href="product.html?id=${this.props.product.id}">View <i class="bi bi-three-dots"></i></a>
                <a class="btn btn-outline-dark text-white add-cart-btn btn btn-success " href="#">Add to Cart <i class="bi bi-cart"></i></a>
                 
            </div>
        </div>

  `;
    // Adaugă eveniment pentru butonul "Add to Cart"
    product
      .querySelector(".add-cart-btn")
      ?.addEventListener("click", this.handleAddToCart);
    // Adaugă eveniment pentru butonul "Add to Cart" din modal
    product
      .querySelector(".add-cart-btn-modal")
      ?.addEventListener("click", this.handleAddToCart);
    return product;
  }
}
