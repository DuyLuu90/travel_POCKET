'use strict';




const googleSearchUrl = "https://kgsearch.googleapis.com/v1/entities:search";

const google_api_key = "AIzaSyAe5uuD2UQozJY02zt42HAFnCCeWq-nd8s"

// const wikiEndpoint='http://en.wikipedia.org/w/api.php?origin=*&action=opensearch&format=json&search='

/* function getCountryCode(searchedTerm) {


  const googleSearchTerm = '';

} */

function displayCityResults(json) {

  $("#knowledge-bar-results").empty();

  console.log(json);

  $("#knowledge-bar-results").append(
      `<li>
          <h3>${json.itemListElement.result.name}</h3>
          <p>${json.itemListElement.result.detailedDescription.articleBody}</p>
          <p><img src='${json.itemListElement.result.image.contentUrl}'  alt='Picture of ${json.itemListElement.result.name}></p>
          `
  )
  $("knowledge-bar").removeClass('hidden');

}


function getKnowledgeData(googleSearchTerm) {

    console.log('Getting knowledge panel data...');

    let params = {
      key: google_api_key,
      query: googleSearchTerm,
      types: "City",
    }

    const googleQueryString = $.param(params);
    const url = `${googleSearchUrl}?${googleQueryString}`;
    fetch(url).then(resp => {
      if(resp.ok) {
        return resp.json();
      }

      throw new Error(resp.statusText);
    }).then(respJson=>displayCityResults(respJson))


}



function renderHomePage(searchedTerm) {

    
    console.log(`Looking for ${searchedTerm}...`);

    const googleSearchTerm = `${searchedTerm}, France`;
    getKnowledgeData(googleSearchTerm);

}


function handleSearchButton() {

    console.log('Handling search button!');

    $('#search').submit(event => {
        event.preventDefault();
        const searchedTerm=$('#search-box').val().toUpperCase();

        console.log(`Search for ${searchedTerm} is on!`);
        
        renderHomePage(searchedTerm);

        console.log('Just called renderHomePage...');
//        $('main').html(`${html}`);
    })  
}

function runApp() {
    handleSearchButton();
    displayCountries();
    getCountryCode();
}

$(runApp);