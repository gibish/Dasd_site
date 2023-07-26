const allLangs = ["en", "ua"];
let currentLang = localStorage.getItem("language") || checkBrowserLang() || "en";
const langButtons = document.querySelectorAll("[data-btn]");
const currentPathName = window.location.pathname;
let currentText = {};

function checkPagePathName() {
  currentText = headerText;
  switch (currentPathName) {
    case "/index.html":
      currentText = Object.assign(currentText, mainText);
      break;
    case "/department.html":
      currentText = Object.assign(currentText, departmentText);
      break;
    case "/institute.html":
      currentText = Object.assign(currentText, instituteText);
      break;
    case "/_wbs.html":
      currentText = Object.assign(currentText, wbsText);
      break;
    default:
      currentText = Object.assign(currentText, mainText);
      break;
  }
}

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

const header = document.getElementById("header");
const nav = document.getElementById("nav");
let headerH = header.clientHeight;
let scrollOffset = window.scrollY;

checkScroll(scrollOffset);

window.addEventListener("scroll", () => {
  scrollOffset = window.scrollY;
  checkScroll(scrollOffset);
});

function checkScroll(scrollOffset) {
  if (scrollOffset >= headerH) {
    nav.classList.add("nav--fixed");
  } else {
    nav.classList.remove("nav--fixed");
  }
}

const navToggle = document.getElementById("nav_toggle");
const navMenu = document.getElementById("nav_menu");

navToggle.addEventListener("click", (event) => {
  event.preventDefault();
  navMenu.classList.toggle("nav__menu-active");
  navToggle.classList.toggle("active");
});
