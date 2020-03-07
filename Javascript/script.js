'use strict';

let searchedTerm = '';

const googleSearchUrl = "https://kgsearch.googleapis.com/v1/entities:search";

const wikiSearchUrl = "https://en.wikipedia.org/w/api.php";

const unsplashSearchUrl = "https://api.unsplash.com/search/photos";

const unsplashAccessKey = "1LLu0GSLnJmNfZPiYd57mbOpyHyTqCmHUS46qGW9eYw"

function getSplashImage(searchedTerm) {

  console.log("in getSplashImage");

  let params = {
    client_id: unsplashAccessKey,
    order_by: "relevant",
    query: searchedTerm,
  }

  const unsplashQueryString = $.param(params);
  const url = `${unsplashSearchUrl}?${unsplashQueryString}`;
  console.log(url);
  fetch(url).then(resp => {
    if(resp.ok) {
      console.log("Image json",resp);
      return resp.json();
    }

    throw new Error(resp.statusText);
  }).then(respJson=>displaySplashResults(respJson))


}

function displaySplashResults(json) {

    console.log("Display splash image firing!");

  $("#knowledge-bar-results").empty(); // Originally in wikidata display function, now needed here

console.log(json);


$("#knowledge-bar-results").append(
    `<li>
        <p><img src="${json.results[0].urls.thumb}" alt="A picture"></p>
        `
)
$("#knowledge-bar").removeClass('hidden'); 
}

function getCityCapsuleData(searchedTerm) {
    let params = {
        action: "query",
        format: "json",
        origin: "*",
        prop: "extracts",
        exintro: 1,
        exsentences: 5,
        explaintext: 1,
        redirects: 1,
        titles: searchedTerm,
  }

  const wikiQueryString = $.param(params);
  const url = `${wikiSearchUrl}?${wikiQueryString}`;
  fetch(url).then(resp => {
    if(resp.ok) {
      console.log("Wiki json",resp);
      return resp.json();
    }

    throw new Error(resp.statusText);
  }).then(respJson=>displayWikiResults(respJson))

}


function displayWikiResults(json) {

  console.log("displayCityResults firing!");

  
//  $("#knowledge-bar-results").empty(); // No longer desirable since image function is firing first

  console.log(json);

  let wikiObject = json.query.pages;

  for (let key in wikiObject) {  

  $("#knowledge-bar-results").append(
      `<li>
          <h3>${wikiObject[key].title}</h3>
          <p>${wikiObject[key].extract}</p>
          `
  )
  $("#knowledge-bar").removeClass('hidden');
  }

}


/* function renderHomePage(searchedTerm) {
    console.log(`renderHomePage firing!`);
    console.log(`Looking for ${searchedTerm}...`);

    const googleSearchTerm = `${searchedTerm}, France`;
    getKnowledgeData(googleSearchTerm);

} */


function handleSearchButton() {

    console.log('Handling search button!');

    $('#search').submit(event => {
        event.preventDefault();
        const searchedTerm=$('#search-box').val();
        console.log(`Search for ${searchedTerm} is on!`);
        getSplashImage(searchedTerm);
        console.log('Just called getSplashImage...');
        getCityCapsuleData(searchedTerm);
        console.log('Just called getCityCapsuleData...');
//        $('main').html(`${html}`);
    }) 



}

function runApp() {
    handleSearchButton();
//    displayCountries();
//   getCountryCode();
}

$(runApp);