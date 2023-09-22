// const btnGetPubl = document.getElementById("btn_test");

// btnGetPubl.addEventListener("click", () => {
//   getPublication();
// });

async function getPublication() {
  //const tokenURL = "https://pub.orcid.org/v3.0/0000-0003-1504-4439/works/";
  //const tokenURL = "https://pub.orcid.org/v3.0/0000-0003-1504-4439/work/135465434/";

  const mainURL = "https://pub.orcid.org/v3.0";
  const sufWorksURL = "/works/";
  const sufWorkURL = "/work/";

  let publications = [];

  let orcidNumbers = [
    "0000-0003-1504-4439", // Galelyuka I.
    "0000-0001-6277-8756", // Romanov V.
    "0000-0003-1784-4296", // Kedych A.
  ];

  let opt = {
    method: "GET",
    headers: {
      "Content-Type": "application/vnd.orcid+json",
    },
  };

  let requests = orcidNumbers.map((orcidNumber) => fetch(`${mainURL}/${orcidNumber}${sufWorksURL}`, opt));

  Promise.all(requests)
    /* Checking status of all fetch*/
    // .then((responses) => {
    //   responses.forEach((response) => {
    //     console.log(response.url, response.status);
    //   });
    //   return responses;
    // })
    .then((responses) => Promise.all(responses.map((res) => res.json())))
    .then((lists) =>
      lists.forEach((list) => {
        list.group.forEach((item, i) => {
          publications.findIndex((el) => el.title == item["work-summary"][0]["title"]["title"].value) + 1
            ? {}
            : publications.push(prepareList(item));
        });
      })
    )
    .then(() => {
      //      console.log("Last:", publications);
      let requestsOne = publications.map((publicationOne) => fetch(`${mainURL}${publicationOne.path}`, opt));

      Promise.all(requestsOne)
        /* Checking status of all fetch*/
        // .then((responsesOne) => {
        //   responsesOne.forEach((responseOne) => {
        //     console.log(responseOne.url, responseOne.status);
        //   });
        //   return responsesOne;
        // })
        .then((responsesOne) => Promise.all(responsesOne.map((res) => res.json())))
        .then((lists) =>
          lists.forEach((item, i) => {
            console.log(item);
            let authors = "";
            let authorsCount = item["contributors"]["contributor"].length;
            item["contributors"]["contributor"].forEach((contr, j) => {
              authors += contr["credit-name"].value;
              j < authorsCount - 1 ? (authors += ", ") : {};
            });
            publications[i].authors = authors;
            publications[i].url = item.url.value;
            if (!publications[i].url.includes("doi") && item["external-ids"]["external-id"]) {
              let res = "https://doi.org/";
              item["external-ids"]["external-id"].forEach((item) => {
                if (item["external-id-type"].includes("doi")) {
                  res += item["external-id-normalized"].value;
                  publications[i].url = res;
                }
              });
              //             console.log(res);
            }
          })
        )
        .then(() => {
          //   publications.forEach((pub) => {
          //     let date = pub.publDate.year + pub.publDate.month + pub.publDate.day;
          //     console.log("Date", date);
          //   });

          let arr = publications.sort((a, b) => {
            return +(a.publDate.year + a.publDate.month + a.publDate.day) <
              +(b.publDate.year + b.publDate.month + b.publDate.day)
              ? 1
              : -1;
          });
        })
        .then(() => {
          displayList(publications);
        })
        .catch((error) => console.log("My One error:", error));
    })
    .catch((error) => console.log("My error:", error));

  console.log("Publications:", publications);
}

function prepareList(item) {
  // console.log("I:", item);

  let publication = { title: null, journalTitle: null, path: null, publDate: { year: null, month: null, day: null } };
  publication.title = item["work-summary"][0]["title"]["title"].value;
  publication.journalTitle =
    item["work-summary"][0]["journal-title"] !== null ? item["work-summary"][0]["journal-title"].value : "n/a";
  publication.path = item["work-summary"][0]["path"];
  //publication.publDate = item["work-summary"][0]["publication-date"];
  publication.publDate.year = !item["work-summary"][0]["publication-date"]["year"]
    ? "0000"
    : item["work-summary"][0]["publication-date"]["year"].value;
  publication.publDate.month = !item["work-summary"][0]["publication-date"]["month"]
    ? "00"
    : item["work-summary"][0]["publication-date"]["month"].value;
  publication.publDate.day = !item["work-summary"][0]["publication-date"]["day"]
    ? "00"
    : item["work-summary"][0]["publication-date"]["day"].value;

  return publication;
}

function displayList(publications) {
  const publicationsOrderedList = document.getElementById("content__list-publications-ol");
  publicationsOrderedList.innerHTML = "";
  publications.forEach((publ, i) => {
    let li = document.createElement("li");
    let spanTitle = document.createElement("span");
    spanTitle.classList.add("content__list-title", "content--subhead-color");
    spanTitle.innerHTML = `${publ.title}`;
    let spanAuthors = document.createElement("span");
    spanAuthors.classList.add("content__list-authors");
    spanAuthors.innerHTML = `Authors: ${publ.authors}`;
    let spanIssue = document.createElement("span");
    spanIssue.classList.add("content__list-issue");
    spanIssue.innerHTML = `Issue title: ${publ.journalTitle}`;
    let spanDate = document.createElement("span");
    spanDate.classList.add("content__list-date");
    spanDate.innerHTML = `Publication date: ${publ.publDate.day == "00" ? "" : publ.publDate.day + "."}${
      publ.publDate.month == "00" ? "" : publ.publDate.month + "."
    }${publ.publDate.year == "0000" ? "" : publ.publDate.year}`;
    let spanLink = document.createElement("span");
    spanLink.classList.add("content__list-link");
    spanLink.innerHTML = `URL: <a class="content__list-link-a" href="${publ.url}" target="_blank">${publ.url}</a>`;

    if (publ.journalTitle !== "n/a" && publ.authors) {
      li.append(spanTitle, spanAuthors, spanIssue, spanDate, spanLink);
      publicationsOrderedList.append(li);
    }
  });
}

getPublication();
