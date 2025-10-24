import "./app.min.js";
/* empty css                     */
document.addEventListener("click", function(e) {
  const icon = e.target.closest(".info-cart__text_icon");
  if (!icon) return;
  const info = icon.closest(".info-cart");
  if (info) info.remove();
});
