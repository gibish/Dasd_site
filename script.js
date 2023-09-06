const allLangs = ["en", "ua"];
let currentLang = localStorage.getItem("language") || checkBrowserLang() || "en";
const langButtons = document.querySelectorAll("[data-btn]");
const currentPathNameFull = window.location.pathname;
let currentText = {};

const currentPathName = currentPathNameFull.slice(currentPathNameFull.lastIndexOf("/"));

console.log(currentPathName);

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
    case "/contacts.html":
      currentText = Object.assign(currentText, contactsText);
      break;
    case "/staff.html":
      currentText = Object.assign(currentText, staffText);
      break;
    case "/projects.html":
      currentText = Object.assign(currentText, projectsText);
      break;
    case "/project01.html":
      currentText = Object.assign(currentText, project01Text);
      break;
    case "/project02.html":
      currentText = Object.assign(currentText, project02Text);
      break;
    case "/project03.html":
      currentText = Object.assign(currentText, project03Text);
      break;
    case "/publications.html":
      currentText = Object.assign(currentText, publicationsText);
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

const darkIcon = `<svg fill="currentColor" aria-hidden="true" viewBox="0 0 24 24" tabindex="-1" title="Dark"><path d="M10 2c-1.82 0-3.53.5-5 1.35C7.99 5.08 10 8.3 10 12s-2.01 6.92-5 8.65C6.47 21.5 8.18 22 10 22c5.52 0 10-4.48 10-10S15.52 2 10 2z"></path></svg>`;
const sunriseIcon = `<svg fill="currentColor" aria-hidden="true" viewBox="0 0 24 24" tabindex="-1" title="Sunrise"><path d="M20 15.31 23.31 12 20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69zM12 18V6c3.31 0 6 2.69 6 6s-2.69 6-6 6z"></path></svg>`;
