const btnGetPubl = document.getElementById("btn_test");

btnGetPubl.addEventListener("click", () => {
  getPublication();
});

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
            //            console.log(item);
            let authors = "";
            let authorsCount = item["contributors"]["contributor"].length;
            item["contributors"]["contributor"].forEach((contr, j) => {
              authors += contr["credit-name"].value;
              j < authorsCount - 1 ? (authors += ", ") : {};
            });
            publications[i].authors = authors;
            publications[i].url = item.url.value;
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
        .catch((error) => console.log("My One error:", error));
    })
    .catch((error) => console.log("My error:", error));

  console.log("Publications:", publications);
}

function prepareList(item) {
  let publication = { title: null, journalTitle: null, path: null, publDate: { year: null, month: null, day: null } };
  publication.title = item["work-summary"][0]["title"]["title"].value;
  publication.journalTitle = item["work-summary"][0]["journal-title"].value;
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
