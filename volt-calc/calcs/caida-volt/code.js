const form = document.querySelector("#voltageDropForm");
const distanceInput = document.querySelector("#distanceInput");
const amperageInput = document.querySelector("#amperageInput");
const systemSelect = document.querySelector("#systemSelect");
const gaugeSelect = document.querySelector("#gaugeSelect");
const resultInput = document.querySelector("#resultInput");
const message = document.querySelector("#formMessage");
const submitButton = document.querySelector("#submitButton");

let hasResult = false;

const resistances = {
  cal3_0: 0.000611,
  cal2_0: 0.000772,
  cal1_0: 0.000983,
  cal3: 0.002028,
  cal4: 0.002539,
  cal6: 0.004104,
  cal8: 0.00651,
  cal10: 0.01015,
  cal12: 0.01614,
  cal14: 0.02568,
  cal16: 0.04082,
};

const systems = {
  monofasica: {
    factor: 2,
    powerFactor: 0.8,
  },
  monofasica220: {
    factor: 2,
    powerFactor: 0.8,
  },
  bifasica: {
    factor: 2,
    powerFactor: 0.8,
  },
  trifasica: {
    factor: 1.73205,
    powerFactor: 0.8,
  },
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
    distance: Number(distanceInput.value),
    amperage: Number(amperageInput.value),
    system: systemSelect.value,
    gauge: gaugeSelect.value,
  };
}

function isFormComplete() {
  const { distance, amperage, system, gauge } = getValues();

  return distanceInput.value.trim() !== ""
    && amperageInput.value.trim() !== ""
    && distance > 0
    && amperage > 0
    && system !== ""
    && gauge !== "";
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
  distanceInput.focus();
}

function calculate() {
  const { distance, amperage, system, gauge } = getValues();
  const resistance = resistances[gauge];
  const systemData = systems[system];

  if (!resistance) {
    message.textContent = "Este calibre no esta en la base de datos por ahora.";
    message.classList.remove("ready");
    return;
  }

  if (!systemData) {
    message.textContent = "Los campos deben estar llenos.";
    message.classList.remove("ready");
    return;
  }

  const voltageDrop = systemData.factor * resistance * distance * amperage * systemData.powerFactor;
  resultInput.value = `${voltageDrop.toFixed(2)} V`;
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
