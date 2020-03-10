'use strict';

const searchedTerm= {
  countryCode: '',
  countryName: '',
  cityName: '',
  latitude: '',
  longitude: '',
  airportCode: '',
  airportName: '',
}

function getWikiImage(searchedTerm) {
  let params = {
    action: "query",
    format: "json",
    origin: "*",
    prop: "pageimages",
    pithumbsize: 300,
    titles: searchedTerm.airportName,
  }

  const wikiImageQueryString = $.param(params);
  const url = `${wikiSearchUrl}?${wikiImageQueryString}`;
  console.log(url);
  fetch(url).then(resp => {
    if(resp.ok) {
      console.log("Image json",resp);
      return resp.json();
    }
    throw new Error(resp.statusText);})
    .then(respJson=>displayImageResults(respJson))
}

function displayImageResults(json) {
  console.log(json);
  let wikiImageObject = json.query.pages;
    for (let key in wikiImageObject) {  
      if(wikiImageObject[key].missing === "") {
          $(".js-image").html(`<p>${searchedTerm.cityName} has no image available.</p>`)
      }
      else {
          $(".js-image").html(`
          <img src="${wikiImageObject[key].thumbnail.source}" alt="Image of ${searchedTerm.airportName}">`)}
    }
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
        titles: searchedTerm.airportName,
  }
    const wikiDataQueryString = $.param(params);
    const url = `${wikiSearchUrl}?${wikiDataQueryString}`;
    fetch(url).then(resp => {
        if(resp.ok) {
          console.log("Wiki json",resp);
          return resp.json();}
          throw new Error(resp.statusText);})
    .then(respJson=>displayWikiResults(respJson))

}

function displayWikiResults(json) {
  console.log(json);
  let wikiTextObject = json.query.pages;
    for (let key in wikiTextObject) {
      if (key==='-1') {
        $(".one").html(`<p>${searchedTerm.airportName} has no Wikipedia data available.</p>`)
      }
      else {
        let content= wikiTextObject[key].extract;
        console.log(content);
        $(".one").html(`<p>${content}</p>`) }  
    }
} 

function handleHomeClicked() {
  $('#reload').click(event=>location.reload())
}

function handleExploreButton() {
  $('#citySearch').submit(event=>{
    event.preventDefault();
    $('.js-home').removeClass('hidden');
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

    renderHomePage(searchedTerm.cityName,searchedTerm.countryName,searchedTerm.airportName);
    
    const URL1= `${wxURL}lat=${searchedTerm.latitude}&lon=${searchedTerm.longitude}`
    fetch(URL1)
    .then(response=> {
      if (response.ok) return response.json()
      throw new Error (`${response.message}`)  })
    .then(json=>{ console.log(json);
      displayWeather(json)})
    .catch (error=> $('.sub-container2').html('Sorry, weather information is not available'))
    
    const URL2=`${ytURL}${searchedTerm.countryCode}`
    console.log(URL2)
    fetch(URL2)
    .then(response=> {
      if (response.ok) return response.json()
      throw new Error('There is an error')})
    .then(json=>displayVideo(json))
    .catch (error=> {
      console.log(error);
      $('.sub-container3').html('Invalid Region Code')})

    const URL3= `${geoURL}&lat=${searchedTerm.latitude}&long=${searchedTerm.longitude}`
    
    fetch(URL3)
    .then(response=> {
      if (response.ok) return response.json()
      throw new Error(`${error.message}`)})
    .then(json=> {
      $('#fromDate').attr('min',`${json.date}`)
      $('.date').html(`${json['date_time_txt']}`)})
    .catch(error=>$('.date').html(`${d}`))

    getWikiImage(searchedTerm);
    getCityCapsuleData(searchedTerm);

  })
}

function handleDate() {
  $('#flight').on('change','#fromDate',event=> {
    let fromDate=$('#fromDate').val();
    $('#toDate').attr('min',`${fromDate}`);
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

function pageLoad() {
  let store=[];
  let CC= $('#country').val();
  if (CC) {
      //create a store that has all cities with the CC
      for (let i=0; i<cityList2.length; i++) {
          if (cityList2[i].countryCode===CC) store.push(cityList2[i])
          }
      //add city prop to store
      for (let i=0; i<store.length; i++) {
          let x= store[i].airportCode;
          let index=cityList1.findIndex(obj=>obj.code===x);
          store[i].city = `${cityList1[index].city}`;
          }
  }
  store.sort((a,b)=>a.city.localeCompare(b.city));
  let html= generateCityOptions(store);
  $('#city').html(html);        
}

function displayCity() {
  $('#country').change(event=>pageLoad())
}

function generateCity(item) {
  return `
  <option value='${item.airportCode}'>${item.city}(${item.airportCode})</option>`
}

function generateCityOptions (store) {
  const items= store.map (item=>generateCity(item));
  return items.join("");
}

function renderHomePage(city,country,airport) {
  $('.cityTitle').html(`Welcome to ${city}, ${country}`);
  $('.js-weather h3').html(`${airport}&nbsp;&nbsp;<i class="fa fa-thermometer"></i>`);
  $('.js-video h3').html(`Top 5 trending videos in ${country}`);
  $('.homeImage').hide();
  $('.flights').empty();
}

/*
function displayPageImage(response) {
let x=json.query.pages.thumbnail.source;
$('.pageImages').html(`<img src='${x}' alt='city image'>`)
}*/





function displayVideo(response) {
let array=response.items;
let html= array.map(obj => `
<div class='video'>    
  <iframe
  src="https://www.youtube.com/embed/${obj.id}"></iframe> 
  <div class='videoTitle'>${obj.snippet.title}</div>
</div>`)
html.join('');
$('#videoList').html(html);
}

function displayWeather(response) {
let cityName = response.name.toUpperCase();
let description= response.weather[0].description.toUpperCase();
let html= `
  <div class='currentTemp'> 
    <div><img src='http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png' alt='wxIcon'></div>
    <p>${response.main.temp}<span>&#8451</span></p>
  </div>
  <p> ${response.main['temp_min']}<span>&#8451;</span>/ ${response.main['temp_max']}<span>&#8451;</span> &nbsp;&nbsp; Feels like ${response.main['feels_like']}<span>&#8451;</span> </p>
  <p> ${description} &nbsp;&nbsp;Humidity ${response.main.humidity}% </p> `
$('.weatherInfo').html(html);
}

function displayFlights(response) {
let results=response.data;

let html= results.map(obj=> 
  /*
  let desCityCode=obj.flyTo;
  let desCountry=obj.country.name;
  */
  `<div class='flight'>
    
    <div class='summary' style https://source.unsplash.com/random/?attraction,>
      <p>${obj.cityFrom} &rarr; </p>
      <h2>${obj.cityTo}</h2>
      <p>${obj.countryTo.name}</p>
      <p>Duration: ${obj['fly_duration']}</p>
      <hr>
      <div class=flightFooter'>
        <img src='http://pics.avs.io/140/40/${obj.airlines[0]}.png' class='logo' alt='${obj.airlines[0]}'>
        <p class='price'>From $${obj.price} </p>
      </div>
    </div>
    <div class='booking'>
      <a href='${obj['deep_link']}' target="_blank">Book now</a>
    </div>
  </div>` 
)
html.join('');
$('.flights').html(`
  <h1> Top flight deals for you </h1>
  ${html}`);
}

/*
function renderHotelPage() {

}
*/


function runApp() {
  //handleSeachButton();
  handleHomeClicked()
  displayCountries();
  displayCity();
  handleExploreButton();
  pageLoad();
  handleDate();
  handleFlightSearchSubmitted();
}

$(runApp);