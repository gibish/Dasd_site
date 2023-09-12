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
const lightIcon = `<svg fill="currentColor" aria-hidden="true" height="24" viewBox="0 -960 960 960" width="24"><path d="M440-760v-160h80v160h-80Zm266 110-55-55 112-115 56 57-113 113Zm54 210v-80h160v80H760ZM440-40v-160h80v160h-80ZM254-652 140-763l57-56 113 113-56 54Zm508 512L651-255l54-54 114 110-57 59ZM40-440v-80h160v80H40Zm157 300-56-57 112-112 29 27 29 28-114 114Zm283-100q-100 0-170-70t-70-170q0-100 70-170t170-70q100 0 170 70t70 170q0 100-70 170t-170 70Zm0-80q66 0 113-47t47-113q0-66-47-113t-113-47q-66 0-113 47t-47 113q0 66 47 113t113 47Zm0-160Z"/></svg>`;
//const lightIcon = `<svg fill="currentColor" aria-hidden="true" viewBox="0 0 24 24" tabindex="-1" title="Sunrise"><path d="M20 15.31 23.31 12 20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69zM12 18V6c3.31 0 6 2.69 6 6s-2.69 6-6 6z"></path></svg>`;

let imgLight = document.getElementById("img_light_theme");
imgLight.innerHTML = lightIcon;
let imgDark = document.getElementById("img_dark_theme");
imgDark.innerHTML = darkIcon;

const allThemes = ["light", "dark"];
//let currentLang = localStorage.getItem("language") || checkBrowserLang() || "en";
const themeButtons = document.querySelectorAll("[data-theme_btn]");
console.log(themeButtons);

let currentTheme = localStorage.getItem("theme") || "dark";

const changeTheme = (theme) => {
  document.documentElement.style.setProperty("--color-bg", `var(--${theme}-color-bg)`);
  document.documentElement.style.setProperty("--color-bg2", `var(--${theme}-color-bg2)`);
  document.documentElement.style.setProperty("--color-bg3", `var(--${theme}-color-bg3)`);
  document.documentElement.style.setProperty("--color-text", `var(--${theme}-color-text)`);
  document.documentElement.style.setProperty("--color-text-menu", `var(--${theme}-color-text-menu)`);
  document.documentElement.style.setProperty("--color-text-link", `var(--${theme}-color-text-link)`);
  document.documentElement.style.setProperty("--color-text2", `var(--${theme}-color-text2)`);
  document.documentElement.style.setProperty("--color-text2-menu", `var(--${theme}-color-text2-menu)`);
  document.documentElement.style.setProperty("--color-link", `var(--${theme}-color-link)`);
};

changeTheme(currentTheme);

themeButtons.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    currentTheme = event.target.dataset.theme_btn;
    localStorage.setItem("theme", event.target.dataset.theme_btn);
    resetActiveTheme(themeButtons, "active");
    btn.classList.add("active");
    changeTheme(currentTheme);
    console.log(currentTheme);
  });
});

function resetActiveTheme(arr, activeClass) {
  arr.forEach((elem) => {
    elem.classList.remove(activeClass);
  });
}

function checkActiveThemeButton() {
  switch (currentTheme) {
    case "light":
      document.querySelector(`[data-theme_btn="light"]`).classList.add("active");
      break;
    case "dark":
      document.querySelector(`[data-theme_btn="dark"]`).classList.add("active");
      break;
    default:
      document.querySelector(`[data-theme_btn="dark"]`).classList.add("active");
      break;
  }
}

checkActiveThemeButton();
