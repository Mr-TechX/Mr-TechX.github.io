const buttons = document.querySelectorAll(".calc-button");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.dataset.target;

    if (target) {
      window.location.href = target;
    }
  });
});
