const allLangs = ["en", "ua"];
let currentLang =
  localStorage.getItem("language") || checkBrowserLang() || "en";
const langButtons = document.querySelectorAll("[data-btn]");
const currentPathName = window.Location.currentPathName;
let currentText = {};

function checkPagePathName() {
  switch (currentPathName) {
    case "/index.html":
      currentText = mainText;
      break;
    default:
      currentText = mainText;
      break;
  }
}

console.log(currentText);

checkPagePathName();

function changeLang() {
  for (const key in currentText) {
    const elem = document.querySelector(`[data-lang=${key}]`);
    if (elem) {
      elem.textContent = currentText[key][currentLang];
    }
  }
}

changeLang();

langButtons.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    currentLang = event.target.dataset.btn;
    localStorage.setItem("language", event.target.dataset.btn);
    resetActiveLang(langButtons, "active");
    btn.classList.add("active");
    changeLang();
  });
});

function resetActiveLang(arr, activeClass) {
  arr.forEach((elem) => {
    elem.classList.remove(activeClass);
  });
}

function checkActiveLangButton() {
  switch (currentLang) {
    case "en":
      document.querySelector(`[data-btn="en"]`).classList.add("active");
      break;
    case "ua":
      document.querySelector(`[data-btn="ua"]`).classList.add("active");
      break;
    default:
      document.querySelector(`[data-btn="en"]`).classList.add("active");
      break;
  }
}

checkActiveLangButton();

function checkBrowserLang() {
  const navLang = navigator.language.slice(0, 2).toLowerCase();
  const result = allLangs.some((elem) => {
    return elem === navLang;
  });

  if (result) {
    return navLang;
  }
}