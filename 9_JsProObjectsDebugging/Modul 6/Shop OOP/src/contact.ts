// Import our custom CSS
import "./assets/scss/styles.scss";

// Import all of Bootstrap's JS
import * as bootstrap from "bootstrap";
import "./js/nav_sticky";

// Import clasa App
import { App } from "./js/components/App";

// Creează instanța aplicației pentru pagina Contact
const app = new App({
  page: "contact", // Specifică pagina curentă
});

// Montează aplicația în DOM
document.body.appendChild(app.render());
