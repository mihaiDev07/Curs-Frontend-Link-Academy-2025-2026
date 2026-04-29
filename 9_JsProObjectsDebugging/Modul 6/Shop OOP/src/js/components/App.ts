import { Component } from "./Component";
import { ProductList } from "./ProductList";
import { CartList } from "./CartList";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { About } from "./About";
import { Contact } from "./Contact";
import { ProductDetails } from "./ProductDetails";
import { CartContext } from "../contexts/CartContext";

interface AppProps {
  cartContext?: CartContext;
  page?: string;
}

export class App extends Component<AppProps> {
  page: string;

  constructor(props: AppProps) {
    super(props);
    console.log("props.page", props.page);
    this.page = props.page || "home"; // Determină pagina curentă (default: "home")
  }

  render(): HTMLElement {
    const appContainer = document.createElement("div");
    appContainer.innerHTML = `
      <header></header>
      <div class="cart-div"></div>
      <section class="bg-dark py-3">
          <div class="container px-4 px-lg-5 my-3">
              <div class="text-center text-white">
                  <h1 class="display-4 fw-bolder">Shop JavaScript OOP</h1>
                  <p class="lead fw-normal text-white-50 mb-0">Programarea este ca magia: transformi idei în realitate.</p>
              </div>
          </div>
      </section>
      <section class="py-2">
          <div class="container px-lg-5 mt-3 wrapper">
          </div>
      </section>
      <footer class="py-5 bg-dark"></footer>
    `;

    // Creează componentele reutilizabile
    const header = new Header({
      cartContext: this.props.cartContext,
      siteFname: "Shop",
      siteLname: "JS OOP",
    });

    const footer = new Footer({
      siteOwner: "Adrian Adiaconitei - LinkAcademy",
      siteYear: new Date().getFullYear(),
      siteLink: "https://link-academy.com",
    });

    // Adaugă header-ul și footer-ul
    appContainer.querySelector("header")?.appendChild(header.render());
    appContainer.querySelector("footer")?.appendChild(footer.render());

    // Adaugă conținut specific paginii
    const wrapper = appContainer.querySelector(".wrapper");
    if (this.page === "home") {
      if (!this.props.cartContext || !wrapper) {
        return appContainer;
      }

      const productList = new ProductList({
        cartContext: this.props.cartContext,
      });

      const cartList = new CartList({
        cartContext: this.props.cartContext,
      });

      productList.mount(wrapper); // Afișează lista de produse
      appContainer.querySelector(".cart-div")?.appendChild(cartList.render()); // Afișează coșul
    } else if (this.page === "about") {
      if (!wrapper) {
        return appContainer;
      }

      const about = new About(); // Creează instanța componentei About
      wrapper.appendChild(about.render()); // Montează componenta About
    } else if (this.page === "contact") {
      if (!wrapper) {
        return appContainer;
      }

      const contact = new Contact(); // Creează instanța componentei Contact
      wrapper.appendChild(contact.render()); // Montează componenta Contact
    } else if (this.page === "product") {
      if (!wrapper) {
        return appContainer;
      }

      const productDetails = new ProductDetails({
        cartContext: this.props.cartContext,
      });

      if (this.props.cartContext) {
        const cartList = new CartList({
          cartContext: this.props.cartContext,
        });
        appContainer.querySelector(".cart-div")?.appendChild(cartList.render());
      }

      productDetails.mount(wrapper);
    }

    return appContainer;
  }
}
