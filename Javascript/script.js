'use strict';
const searchedTerm= {
  countryCode: '',
  countryName: '',
  cityName: '',
  airportCode: '',
}

const wikiEndpoint='http://en.wikipedia.org/w/api.php?origin=*&action=opensearch&format=json&search='


const ytURL='https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=5&key=AIzaSyCQrId_f2HcfIOn3n0-RDBsKIJGIg9w5To&regionCode='

function handleSeachButton() {
  $('#search').submit(event => {
    event.preventDefault();
    let searchedTerm=$('#search-box').val().toUpperCase();
    let html= renderHomePage(searchedTerm);
    $('main').html(`${html}`);
  })  
}

function handleExploreButton() {
  $('#citySearch').submit(event=>{
    event.preventDefault();
    searchedTerm.countryCode=$('#country').val();
    searchedTerm.countryName=$('#country option:selected').text();
    searchedTerm.cityName=$('#city option:selected').text().slice(0,-5);
    searchedTerm.airportCode=$('#city').val();

    console.log(searchedTerm);

    let html= renderHomePage(`${searchedTerm.cityName},${searchedTerm.countryName}`);
    $('main').html(`${html}`);

    
    const URL1=`${ytURL}${searchedTerm.countryCode}`
    fetch(URL1)
    .then(response=>response.json())
    .then(json=>displayVideo(json));

  })
}

function runApp() {
  handleSeachButton();
  displayCountries();
  displayCity();
  handleExploreButton();
}

$(runApp);