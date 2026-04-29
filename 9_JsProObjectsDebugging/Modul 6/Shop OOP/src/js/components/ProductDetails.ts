import { Component } from "./Component";
import { CartContext, Product } from "../contexts/CartContext";

interface ProductDetailsProps {
  cartContext?: CartContext;
}

export class ProductDetails extends Component<ProductDetailsProps> {
  state: {
    product: Product | null;
    error: string | null;
  };

  constructor(props: ProductDetailsProps) {
    super(props);
    this.state = {
      product: null,
      error: null,
    };
    this.handleAddToCart = this.handleAddToCart.bind(this);
  }

  private getProductIdFromUrl(): number | null {
    const params = new URLSearchParams(window.location.search);
    const rawId = params.get("id");

    if (!rawId) {
      return null;
    }

    const parsedId = Number(rawId);
    return Number.isNaN(parsedId) ? null : parsedId;
  }

  handleAddToCart(event: Event) {
    event.preventDefault();
    if (this.props.cartContext && this.state.product) {
      this.props.cartContext.addProduct(this.state.product);
    }
  }

  mount(container: Element) {
    const requestedId = this.getProductIdFromUrl();

    if (requestedId === null) {
      this.state.error = "Lipseste id-ul produsului in URL.";
      container.appendChild(this.render());
      return;
    }

    fetch("./products.json")
      .then((response) => response.json() as Promise<Product[]>)
      .then((products) => {
        const foundProduct =
          products.find((item) => item.id === requestedId) || null;
        this.state.product = foundProduct;

        if (!foundProduct) {
          this.state.error = "Produsul nu a fost gasit.";
        }

        container.appendChild(this.render());
      })
      .catch(() => {
        this.state.error = "A aparut o eroare la incarcarea produsului.";
        container.appendChild(this.render());
      });
  }

  render(): HTMLElement {
    const wrapper = document.createElement("div");

    if (this.state.error) {
      wrapper.innerHTML = `
        <div class="alert alert-warning" role="alert">
          ${this.state.error}
        </div>
        <a href="index.html" class="btn btn-outline-dark">Inapoi la produse</a>
      `;
      return wrapper;
    }

    if (!this.state.product) {
      wrapper.innerHTML = `<p>Se incarca detaliile produsului...</p>`;
      return wrapper;
    }

    const product = this.state.product;
    wrapper.innerHTML = `
      <div class="card border-0 shadow-sm">
        <div class="row g-0 align-items-center">
          <div class="col-md-5 text-center p-4">
            <img src="${product.image}" alt="${product.title}" class="img-fluid" style="max-height: 420px; object-fit: contain;" />
          </div>
          <div class="col-md-7 p-4">
            <h2 class="fw-bold mb-3">${product.title}</h2>
            <p class="text-muted mb-4">${product.description}</p>
            <p class="h4 mb-4"><i class="bi bi-currency-euro"></i> ${product.price.toFixed(2)}</p>
            <div class="d-flex gap-2">
              <a href="index.html" class="btn btn-outline-dark">Inapoi la produse</a>
              <button class="add-cart-btn btn btn-success">Add to Cart <i class="bi bi-cart"></i></button>
            </div>
          </div>
        </div>
      </div>
    `;

    wrapper
      .querySelector(".add-cart-btn")
      ?.addEventListener("click", this.handleAddToCart);

    return wrapper;
  }
}
