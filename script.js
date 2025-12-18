
// Небольшая проверка формы перед "отправкой" + показ модального окна
const form = document.querySelector(".form");

function openModal(name) {
  const modal = document.querySelector(`.modal[data-modal="${name}"]`);
  if (!modal) return;

  modal.classList.add("modal--open");
  document.body.style.overflow = "hidden";
}

function closeModal(name) {
  const modal = document.querySelector(`.modal[data-modal="${name}"]`);
  if (!modal) return;

  modal.classList.remove("modal--open");
  document.body.style.overflow = "";
}

document.addEventListener("click", (event) => {
  const target = event.target;

  // Закрытие по кнопке/фону с атрибутом data-modal-close
  if (target.closest("[data-modal-close]")) {
    const opened = document.querySelector(".modal.modal--open");
    if (opened) {
      const name = opened.getAttribute("data-modal");
      closeModal(name);
    }
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    const opened = document.querySelector(".modal.modal--open");
    if (opened) {
      const name = opened.getAttribute("data-modal");
      closeModal(name);
    }
  }
});

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const requiredFields = form.querySelectorAll("input[required], textarea[required]");
    let isValid = true;

    requiredFields.forEach((field) => {
      if (!field.value.trim()) {
        isValid = false;
        field.classList.add("form__input--error");
      } else {
        field.classList.remove("form__input--error");
      }
    });

    if (!isValid) return;

    const success = form.querySelector(".form__success");
    if (success) {
      success.classList.add("form__success--visible");
    }

    openModal("request");
    form.reset();
  });
}
