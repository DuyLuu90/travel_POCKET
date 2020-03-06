'use strict';

let searchedTerm = '';

const googleSearchUrl = "https://kgsearch.googleapis.com/v1/entities:search";

const wikiSearchUrl = "https://en.wikipedia.org/w/api.php"

// const wikiEndpoint='http://en.wikipedia.org/w/api.php?origin=*&action=opensearch&format=json&search='

/* function getCountryCode(searchedTerm) {


  const googleSearchTerm = '';

} */




/* function getKnowledgeData(googleSearchTerm) {

    console.log('Getting knowledge panel data...');

    let params = {
      query: googleSearchTerm,
      types: 'CITY',
      key: google_api_key,
    }

    const googleQueryString = $.param(params);
    const url = `${googleSearchUrl}?${googleQueryString}`;
    fetch(url).then(resp => {
      if(resp.ok) {
        console.log("1st",resp);
        return resp.json();
      }

      throw new Error(resp.statusText);
    }).then(respJson=>displayCityResults(respJson))


} */

function getWikiData(searchedTerm) {
    let params = {
        action: "query",
        format: "json",
        origin: "*",
        prop: "images|extracts",
        exintro: 1,
        explaintext: 1,
        redirects: 1,
        titles: searchedTerm,
  }

  const wikiQueryString = $.param(params);
  const url = `${wikiSearchUrl}?${wikiQueryString}`;
  fetch(url).then(resp => {
    if(resp.ok) {
      console.log("1st",resp);
      return resp.json();
    }

    throw new Error(resp.statusText);
  }).then(respJson=>displayCityResults(respJson))

}


function displayCityResults(json) {

  console.log("displayCityResults firing!");

  
  $("#knowledge-bar-results").empty();

  console.log(json);

  let wikiObject = json.query.pages;

  for (let key in wikiObject) {  
  
  let imageName = wikiObject[key].images[0].title.replace("File:", "");

  $("#knowledge-bar-results").append(
      `<li>
          <h3>${wikiObject[key].title}</h3>
          <p><img src="https://upload.wikimedia.org/wikipedia/commons/${imageName}" alt="A picture"></p>
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
        getWikiData(searchedTerm);
        console.log('Just called getWikiData...');
//        $('main').html(`${html}`);
    }) 



}

function runApp() {
    handleSearchButton();
//    displayCountries();
//   getCountryCode();
}

$(runApp);