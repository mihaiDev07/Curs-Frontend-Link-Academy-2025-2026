const hamburger = document.querySelector(".hamburger");
const navs = document.querySelectorAll(".navigation_links");
const header = document.getElementById("header");

hamburger.addEventListener("click", () => {
  navs.forEach((nav) => nav.classList.toggle("active"));
  header.classList.toggle("menu-open");

  hamburger.textContent = hamburger.textContent === "☰" ? "✖" : "☰";
});
