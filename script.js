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

const btnGetPubl = document.getElementById("btn_test");

btnGetPubl.addEventListener("click", (event) => {
  getPublication();
});

async function getPublication() {
  console.log("Pressed!");
  const tokenURL = "https://pub.orcid.org/v3.0/0000-0003-1504-4439/works/";
  //const tokenURL = "https://pub.orcid.org/v3.0/0000-0003-1504-4439/work/135465434";

  const mainURL = "https://pub.orcid.org/v3.0/";
  const sufWorksURL = "/works/";
  const sufWorkURL = "/work/";

  let orcidNumbers = [
    "0000-0003-1504-4439", // Galelyuka I.
    "0000-0001-6277-8756", // Romanov V.
  ];

  let opt = {
    method: "GET",
    headers: {
      "Content-Type": "application/vnd.orcid+json",
    },
  };

  let requests = orcidNumbers.map((orcidNumber) => fetch(`${mainURL}${orcidNumber}${sufWorksURL}`, opt));

  Promise.all(requests)
    .then((responses) => {
      responses.forEach((response) => {
        console.log(response.url, response.status);
      });
      //      console.log(responses);
      return responses;
    })
    .then((responses) => Promise.all(responses.map((r) => r.json())))
    .then((lists) => lists.forEach((list) => console.log(list)))
    .catch((error) => console.log("My error:", error));

  // try {
  //   const response = await fetch(tokenURL, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/vnd.orcid+json",
  //       //        Authorization: "Bearer ffab5ba0-6343-465f-b4e1-36c86a57a692",
  //     },
  //   });
  //   const json = await response.json();
  //   displayPublication(json);
  //   //    displayPublication(JSON.stringify(json));
  //   //    console.log("Success:", JSON.stringify(json));
  // } catch (error) {
  //   console.error("Error: ", error);
  // }

  console.log("Pressed finally!");
}

function displayPublication(json) {
  let list = new Set();
  json.group.forEach((pub, i) => {
    list.add(pub["work-summary"][0]["put-code"]);
    //    console.log(i, pub["work-summary"][0]["put-code"]);
  });

  console.log("F:", list);
}
