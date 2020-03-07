'use strict';

const searchedTerm= {
  countryCode: '',
  countryName: '',
  cityName: '',
  latitude: '',
  longitude: '',
  airportCode: '',
  airportName: ''}

const d= new Date();
console.log(d);


const googleSearchUrl = "https://kgsearch.googleapis.com/v1/entities:search";

const wikiSearchUrl = "https://en.wikipedia.org/w/api.php";

const unsplashSearchUrl = "https://api.unsplash.com/search/photos";

const unsplashAccessKey = "1LLu0GSLnJmNfZPiYd57mbOpyHyTqCmHUS46qGW9eYw"

const ytURL='https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=5&key=AIzaSyCQrId_f2HcfIOn3n0-RDBsKIJGIg9w5To&regionCode='

const wxURL='https://api.openweathermap.org/data/2.5/weather?appid=7b211a1b93a6cb41ed410fb0d6ada9a6&units=metric&'

const flyURL='https://api.skypicker.com/flights?fly_to=anywhere&partner=picky&v=3&limit=6&one_for_city=1&sort=price&asc=1&curr=USD'


function getUnsplashImage(searchedTerm) {

  console.log("in getUnsplashImage");

  let params = {
    client_id: unsplashAccessKey,
    order_by: "relevant",
    query: searchedTerm.cityName,
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

    console.log(json);


    $(".js-image").append(
        `<li>
              <p><img src="${json.results[0].urls.thumb}" alt="A picture of ${searchedTerm}"></p>
        `
  )

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
        titles: searchedTerm.cityName,
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

  console.log(json);

  let wikiObject = json.query.pages;

  for (let key in wikiObject) {  

  $(".js-capsule").append(
      `<li>
          <h3>${wikiObject[key].title}</h3>
          <p>${wikiObject[key].extract}</p>
          `
  )
  $("#js-capsule").removeClass('hidden');
  }

} 



/* function handleSearchButton() {
  $('#search').submit(event => {
    event.preventDefault();
    let searchedTerm1=$('#search-box').val().toUpperCase();
    let html= renderHomePage(searchedTerm1);

    getSplashImage(searchedTerm);
    console.log('Just called getSplashImage...');
    getCityCapsuleData(searchedTerm);
    console.log('Just called getCityCapsuleData...');

    $('main').html(`${html}`);
  })  

} */

function handleExploreButton() {
  $('#citySearch').submit(event=>{
    event.preventDefault();
    searchedTerm.countryCode=$('#country').val();
    searchedTerm.countryName=$('#country option:selected').text();
    searchedTerm.cityName=$('#city option:selected').text().slice(0,-5);
    searchedTerm.airportCode=$('#city').val();
    let index1=cityList1.findIndex(obj=>obj.code===searchedTerm.airportCode);
    searchedTerm.latitude= `${cityList1[index1].lat}`
    searchedTerm.longitude= `${cityList1[index1].lon}`
    let index2=cityList2.findIndex(obj=>obj.airportCode===searchedTerm.airportCode)
    searchedTerm.airportName=cityList2[index2].airportName;
    console.log(searchedTerm);

    let html= renderHomePage(searchedTerm.cityName,searchedTerm.countryName,searchedTerm.airportName);
    $('main').html(`${html}`);

    const URL1= `${wxURL}lat=${searchedTerm.latitude}&lon=${searchedTerm.longitude}`
    fetch(URL1)
    .then(response=> {
      if (response.ok) return response.json()
      throw new Error (`${response.message}`)  })
    .then(json=>displayWeather(json))
    .catch (error=> $('.sub-container2').html('Sorry, weather information is not available'))
    
    const URL2=`${ytURL}${searchedTerm.countryCode}`
    fetch(URL2)
    .then(response=> {
      if (response.ok) return response.json()
      throw new Error(`${error.message}`)})
    .then(json=>displayVideo(json))
    .catch (error=> $('.sub-container3').html('Invalid Region Code'))

    getUnsplashImage(searchedTerm);
    getCityCapsuleData(searchedTerm);

  })
}

function handleFlightSearchSubmitted() {
  $('main').on('submit', '#flight', event=> {
    event.preventDefault();
    //change date format
    let fromDate=$('#fromDate').val().split('-').reverse();
    let toDate=$('#toDate').val().split('-').reverse();

    let newFromDate=fromDate.join('/');    
    let newToDate=toDate.join('/');

    let flightParam = {
      "fly_from" : searchedTerm.airportCode,
      'date_from': `${newFromDate}`,
      'date_to': `${newToDate}`
    }

    let URL3= flyURL+'&'+ $.param(flightParam)
    console.log (URL3);

    fetch(URL3)
    .then(response=> {
      if (response.ok) return response.json()
      throw new Error(`${error.message}`)})
    .then(json=>{
      console.log(json)
      displayFlights(json)})
    .catch (error=> console.log(error));
    
  })
}

function runApp() {

//  handleSearchButton();
  displayCountries();
  displayCity();
  handleExploreButton();
  pageLoad ();
  handleFlightSearchSubmitted();

}

$(runApp);