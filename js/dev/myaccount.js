import "./app.min.js";
/* empty css                     */
document.querySelectorAll(".dropdown").forEach((dropdown) => {
  const button = dropdown.querySelector(".dropdown__selected");
  const list = dropdown.querySelector(".dropdown__list");
  const hiddenInput = dropdown.querySelector("input[type=hidden]");
  dropdown.closest("form");
  button.addEventListener("click", () => {
    dropdown.classList.toggle("open");
  });
  list.querySelectorAll("li").forEach((item) => {
    item.addEventListener("click", () => {
      const value = item.getAttribute("data-value");
      hiddenInput.value = value;
      button.textContent = item.textContent;
      dropdown.classList.remove("open");
    });
  });
  document.addEventListener("click", (e) => {
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove("open");
    }
  });
});
document.querySelector(".account__password-block_eye").addEventListener("click", function(e) {
  e.preventDefault();
  const input = document.getElementById("account-password");
  if (input.type === "password") {
    input.type = "text";
    this.children[0].src = "/assets/img/myaccount/eye-slash-svgrepo-com.svg";
  } else {
    input.type = "password";
    this.children[0].src = "/assets/img/myaccount/eye-svgrepo-com.svg";
  }
});
