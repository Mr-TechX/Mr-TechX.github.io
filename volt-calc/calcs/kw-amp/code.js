const form = document.querySelector("#kwAmpForm");
const kwInput = document.querySelector("#kwInput");
const voltsInput = document.querySelector("#voltsInput");
const typeSelect = document.querySelector("#typeSelect");
const resultInput = document.querySelector("#resultInput");
const message = document.querySelector("#formMessage");
const submitButton = document.querySelector("#submitButton");

let hasResult = false;

const formulas = {
  continua: (kw, volts) => (kw * 1000) / volts,
  monofasica: (kw, volts) => (kw * 1000) / (volts * 0.8),
  monofasica220: (kw, volts) => (kw * 1000) / (volts * 0.8),
  bifasica: (kw, volts) => (kw * 1000) / (1.4142 * volts * 0.8),
  trifasica: (kw, volts) => (kw * 1000) / (1.73205 * volts * 0.8),
};

function setupCustomSelect(select) {
  const wrapper = document.createElement("div");
  const button = document.createElement("button");
  const menu = document.createElement("div");
  const options = Array.from(select.options);

  wrapper.className = "custom-select";
  button.className = "custom-select-button";
  button.type = "button";
  button.setAttribute("aria-haspopup", "listbox");
  button.setAttribute("aria-expanded", "false");
  menu.className = "custom-select-menu";
  menu.setAttribute("role", "listbox");

  function selectedText() {
    return select.selectedOptions[0]?.textContent || options[0].textContent;
  }

  function closeMenu() {
    wrapper.classList.remove("open");
    button.setAttribute("aria-expanded", "false");
  }

  function refreshButton() {
    button.textContent = selectedText();
  }

  options.forEach((option) => {
    if (!option.value) {
      return;
    }

    const item = document.createElement("button");
    item.className = "custom-select-option";
    item.type = "button";
    item.textContent = option.textContent;
    item.setAttribute("role", "option");

    item.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      select.value = option.value;
      refreshButton();
      select.dispatchEvent(new Event("change", { bubbles: true }));
      closeMenu();
    });

    menu.appendChild(item);
  });

  button.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    document.querySelectorAll(".custom-select.open").forEach((openSelect) => {
      if (openSelect !== wrapper) {
        openSelect.classList.remove("open");
        openSelect.querySelector(".custom-select-button")?.setAttribute("aria-expanded", "false");
      }
    });
    const isOpen = wrapper.classList.toggle("open");
    button.setAttribute("aria-expanded", String(isOpen));
  });

  document.addEventListener("click", closeMenu);
  select.addEventListener("change", refreshButton);
  select.classList.add("native-select-hidden");
  select.insertAdjacentElement("afterend", wrapper);
  wrapper.append(button, menu);
  refreshButton();

  return refreshButton;
}

const refreshCustomSelects = Array.from(document.querySelectorAll("select")).map(setupCustomSelect);

function getValues() {
  return {
    kw: Number(kwInput.value),
    volts: Number(voltsInput.value),
    type: typeSelect.value,
  };
}

function isFormComplete() {
  const { kw, volts, type } = getValues();

  return kwInput.value.trim() !== ""
    && voltsInput.value.trim() !== ""
    && kw > 0
    && volts > 0
    && type !== "";
}

function updateState() {
  if (hasResult) {
    submitButton.disabled = false;
    return;
  }

  const complete = isFormComplete();
  submitButton.disabled = !complete;
  message.textContent = complete ? "" : "Los campos deben estar llenos.";
  message.classList.toggle("ready", complete);
}

function resetForm() {
  form.reset();
  resultInput.value = "";
  hasResult = false;
  submitButton.textContent = "Enviar";
  refreshCustomSelects.forEach((refresh) => refresh());
  updateState();
  kwInput.focus();
}

function calculate() {
  const { kw, volts, type } = getValues();
  const operation = formulas[type];

  if (!operation) {
    message.textContent = "Los campos deben estar llenos.";
    message.classList.remove("ready");
    return;
  }

  const amps = operation(kw, volts);
  resultInput.value = `${amps.toFixed(2)} A`;
  message.textContent = "Conversion realizada.";
  message.classList.add("ready");
  hasResult = true;
  submitButton.textContent = "Hacer nueva conversion";
}

form.addEventListener("input", updateState);
form.addEventListener("change", updateState);

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (hasResult) {
    resetForm();
    return;
  }

  if (!isFormComplete()) {
    message.textContent = "Los campos deben estar llenos.";
    message.classList.remove("ready");
    updateState();
    return;
  }

  calculate();
});

updateState();
