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
        list: "search",
        srsearch: searchedTerm,
        srlimit: 1,
        srprop: "snippet",
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

  $("#knowledge-bar-results").append(
      `<li>
          <h3>${json.query.search.title}</h3>
          <p>${json.query.search.snippet}</p>
          `
  )
  $("knowledge-bar").removeClass('hidden');

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
        console.log('Just called getKnowledgeData...');
//        $('main').html(`${html}`);
    }) 



}

function runApp() {
    handleSearchButton();
//    displayCountries();
//   getCountryCode();
}

$(runApp);