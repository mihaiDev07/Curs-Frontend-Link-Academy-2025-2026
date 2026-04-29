import { Component } from "./Component";
import { CartContext } from "../contexts/CartContext";

interface HeaderProps {
  cartContext?: CartContext;
  siteFname?: string;
  siteLname?: string;
}

export class Header extends Component<HeaderProps> {
  constructor(props: HeaderProps) {
    super(props);

    // Înregistrăm metoda `updateCartCount` ca subscriber la `cartContext`
    if (this.props.cartContext) {
      this.props.cartContext.subscribe(() => this.updateCartCount());
    }
  }

  // Metoda care actualizează numărul de produse din badge-ul coșului
  updateCartCount() {
    console.log("header nr. produse", this.props.cartContext.countItem());
    const cartNoElement = document.getElementById("cartNo");
    if (cartNoElement && this.props.cartContext) {
      cartNoElement.textContent = String(this.props.cartContext.countItem());
    }
  }

  render(): HTMLElement {
    // Obținem numărul curent de produse din coș
    const cartItemCount = this.props.cartContext
      ? this.props.cartContext.countItem()
      : 0;

    // Creăm elementul HTML pentru header
    const header = document.createElement("div");
    header.innerHTML = `
      <nav id="sticky-top" class="navbar navbar-expand-lg bg-white navbar-light  p-0">
        <a href="index.html" class="navbar-brand d-flex align-items-center px-4 px-lg-5">
           <img src='./assets/images/logo.png' style="max-width: 200px;" alt="${this.props.siteFname} ${this.props.siteLname}">
        </a>
        <button type="button" class="navbar-toggler me-4" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
          <div class="navbar-nav p-4 p-lg-0">
              <a id="home-link" href="index.html" class="nav-item nav-link active">Home</a>
              <a id="about-link" href="about.html" class="nav-item nav-link">About</a>
              <a id="contact-link" href="contact.html" class="nav-item nav-link">Contact</a>
          </div>
          <button class="opening-btn btn btn-outline-dark ms-auto">
              <i class="bi-cart-fill me-1"></i>Cart
              <span id="cartNo" class="badge bg-dark text-white ms-1 rounded-pill">${cartItemCount}</span>
          </button>
        </div>
      </nav>
    `;
    // Setăm clasa `active` pe baza paginii curente
    const currentPath = window.location.pathname;
    const homeLink = header.querySelector("#home-link");
    const aboutLink = header.querySelector("#about-link");
    const contactLink = header.querySelector("#contact-link");

    if (currentPath.includes("index.html") || currentPath === "/") {
      homeLink?.classList.add("active");
      aboutLink?.classList.remove("active");
      contactLink?.classList.remove("active");
    } else if (currentPath.includes("about.html")) {
      aboutLink?.classList.add("active");
      homeLink?.classList.remove("active");
      contactLink?.classList.remove("active");
    } else if (currentPath.includes("contact.html")) {
      contactLink?.classList.add("active");
      homeLink?.classList.remove("active");
      aboutLink?.classList.remove("active");
    }
    // Adăugăm eveniment pentru deschiderea/închiderea coșului
    const openingBtn = header.querySelector(".opening-btn");
    openingBtn?.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(".cart-div")?.classList.toggle("cart-open");
    });

    return header;
  }
}
