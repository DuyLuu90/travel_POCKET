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

const wikiEndpoint='http://en.wikipedia.org/w/api.php?origin=*&action=opensearch&format=json&search='

const ytURL='https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=5&key=AIzaSyCQrId_f2HcfIOn3n0-RDBsKIJGIg9w5To&regionCode='

const wxURL='https://api.openweathermap.org/data/2.5/weather?appid=7b211a1b93a6cb41ed410fb0d6ada9a6&units=metric&'

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

    const URL3='https://api.skypicker.com/flights?fly_from=PHX&fly_to=anywhere&date_from=08/08/2020&date_to=08/09/2020&flight_type=oneway&partner=picky&v=3&limit=5&sort=price&asc=1&curr=USD'
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
  handleSeachButton();
  displayCountries();
  displayCity();
  handleExploreButton();
  pageLoad ();
}

$(runApp);