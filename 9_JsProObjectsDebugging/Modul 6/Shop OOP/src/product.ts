import "./assets/scss/styles.scss";
import * as bootstrap from "bootstrap";
import "./js/nav_sticky";

import { App } from "./js/components/App";
import { CartContext } from "./js/contexts/CartContext";

const root = document.getElementById("app");

if (!root) {
  throw new Error("Missing #app root element");
}

const cartContext = new CartContext();
const app = new App({
  page: "product",
  cartContext,
});

app.mount(root);
