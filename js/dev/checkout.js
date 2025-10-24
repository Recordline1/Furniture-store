import "./app.min.js";
import "./radio.min.js";
/* empty css                     */
document.querySelectorAll(".options__input").forEach((radio) => {
  radio.addEventListener("change", function() {
    document.querySelectorAll(".options__info-text").forEach((text) => {
      text.style.maxHeight = null;
      text.classList.remove("--active");
    });
    const block = this.closest(".options__block");
    const info = block.querySelector(".options__info-text");
    if (info) {
      info.classList.add("--active");
      info.style.maxHeight = info.scrollHeight + "px";
    }
  });
});
