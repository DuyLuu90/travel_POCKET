'use strict';
const searchedTerm= {
  countryCode: '',
  countryName: '',
  cityName: '',
  airportCode: '',
}

const wikiEndpoint='http://en.wikipedia.org/w/api.php?origin=*&action=opensearch&format=json&search='


const ytURL='https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=5&key=AIzaSyCQrId_f2HcfIOn3n0-RDBsKIJGIg9w5To&regionCode='

const wxURL='https://api.openweathermap.org/data/2.5/weather?appid=7b211a1b93a6cb41ed410fb0d6ada9a6&units=metric&q='

function handleSeachButton() {
  $('#search').submit(event => {
    event.preventDefault();
    let searchedTerm1=$('#search-box').val().toUpperCase();
    let html= renderHomePage(searchedTerm1);
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

    let html= renderHomePage(searchedTerm.cityName,searchedTerm.countryName);
    $('main').html(`${html}`);

    const URL1= wxURL+searchedTerm.cityName;
    fetch(URL1)
    .then(response=> response.json())
    .then(json=>displayWeather(json));
    

      // {if (response.cod === 200) return response.json()
      // throw new Error(`${response.message}`)
      // })
    /*
    .then (json=>displayWeather(json))
    .then (error=> $('.sub-container2').html(`${response.message}`));*/
    

    
    const URL2=`${ytURL}${searchedTerm.countryCode}`
    fetch(URL2)
    .then(response=>response.json())
    .then(json=>displayVideo(json));

  })
}

function runApp() {
  handleSeachButton();
  displayCountries();
  displayCity();
  handleExploreButton();
  pageLoad ();
}

$(runApp);