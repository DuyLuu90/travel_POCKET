'use strict';
let searchedTerm='';

const wikiEndpoint='http://en.wikipedia.org/w/api.php?origin=*&action=opensearch&format=json&search='


function handleSeachButton() {
  $('#search').submit(event => {
    event.preventDefault();
    let searchedTerm=$('#search-box').val().toUpperCase();
    let html= renderHomePage(searchedTerm);
    $('main').html(`${html}`);
  })  
}

function runApp() {
  handleSeachButton();
  displayCountries();
  displayCity();
}

$(runApp);