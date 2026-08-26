// Sticky Navigation
window.addEventListener("scroll", function () {
  const stickyTop = document.getElementById("sticky-top");
  if (!stickyTop) {
    return;
  }

  if (window.scrollY > 250) {
    stickyTop.classList.add("fixed-top");
  } else {
    stickyTop.classList.remove("fixed-top");
  }
});
