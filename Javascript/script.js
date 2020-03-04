'use strict';



let searchedTerm='';

const googleSearchUrl = "https://kgsearch.googleapis.com/v1/entities:search";

const google_api_key = "AIzaSyAe5uuD2UQozJY02zt42HAFnCCeWq-nd8s"

// const wikiEndpoint='http://en.wikipedia.org/w/api.php?origin=*&action=opensearch&format=json&search='

function getCountryCode(searchedTerm) {


  const googleSearchTerm = '';
  
}


function renderHomePage() {

}


function getKnowledgeData(googleSearchTerm) {

    let params = {
      key: google_api_key,
      query: googleSearchTerm,
      types: "City",
    }

    const queryString = $.param(params);
    const url = `${googleSearchUrl}?${queryString}`;
    fetch(url).then(resp => {
      if(resp.ok) {
        return resp.json();
      }

      throw new Error(resp.statusText);
    }).then(respJson=>displayCityResults(respJson))


}



function handleSearchButton() {
  $('#search').submit(event => {
    event.preventDefault();
    const searchedTerm=$('#search-box').val().toUpperCase();
    renderHomePage(searchedTerm);
    $('main').html(`${html}`);
  })  
}

function runApp() {
  handleSearchButton();
  displayCountries();
  getCountryCode();
}

$(runApp);