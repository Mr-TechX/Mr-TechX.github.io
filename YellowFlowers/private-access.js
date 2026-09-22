const privateContent = document.querySelector('#private-content');
const vipModal = document.querySelector('#vip-modal');
const vipForm = document.querySelector('#vip-form');
const vipPassword = document.querySelector('#vip-password');
const loginError = document.querySelector('#login-error');

function revealPrivatePage() {
  privateContent.hidden = false;
  vipModal.classList.remove('is-open');
  vipModal.setAttribute('aria-hidden', 'true');
  document.title = 'Para Mariana';
  const bouquetScript = document.createElement('script');
  bouquetScript.src = 'code.js';
  document.body.append(bouquetScript);
}

// La página privada siempre inicia bloqueada y solicita la contraseña.
vipPassword.focus();

vipForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (vipPassword.value === '5js0qxuh') {
    revealPrivatePage();
  } else {
    loginError.textContent = 'La contraseña no es correcta.';
    vipPassword.select();
  }
});
