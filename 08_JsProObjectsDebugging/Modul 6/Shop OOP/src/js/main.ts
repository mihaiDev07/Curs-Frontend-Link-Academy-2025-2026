import { App } from "./components/App";
import { CartContext } from "./contexts/CartContext";

const root = document.getElementById("app");

if (!root) {
  throw new Error("Missing #app root element");
}

const cartContext = new CartContext();
const app = new App({ cartContext });

app.mount(root);
