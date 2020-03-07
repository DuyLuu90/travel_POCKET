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
let year=d.getFullYear();
let month=d.getMonth();
let date=d.getDate();

function getWikiImage(searchedTerm) {
  console.log("getWikiImage firing!");
  let params = {
    action: "query",
    format: "json",
    origin: "*",
    prop: "pageimages",
    pithumbsize: 300,
    titles: searchedTerm.cityName,
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
    console.log("Display image firing!");
    console.log(json);
    let wikiImageObject = json.query.pages;
    for (let key in wikiImageObject) {  
      if(wikiImageObject[key].missing === "") {
          $(".js-image").append(`<p>${searchedTerm.cityName} has no image available.</p>`)
      }
      else {
          $(".js-image").append(`
          <img src="${wikiImageObject[key].thumbnail.source}" alt="Image of ${searchedTerm.cityName}">
          `
      )}
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
        titles: searchedTerm.cityName,
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
  console.log("displayWikiResults firing!");
  console.log(json);
  if(json.query.pages[0] == null) {
    $(".one").append(`<p>${searchedTerm.cityName} is a very nice city!</p>`)
  }
  else {
    let wikiTextObject = json.query.pages;
    for (let key in wikiTextObject) {  
    $(".one").append(`<p>${wikiObject[key].extract}</p>`)    
  }
  }
} 

/*
function handleSeachButton() {
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
}*/

function handleHomeClicked() {
  $('#reload').click(event=>location.reload())
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
    .then(json=>{ console.log(json);
      displayWeather(json)})
    .catch (error=> $('.sub-container2').html('Sorry, weather information is not available'))
    
    const URL2=`${ytURL}${searchedTerm.countryCode}`
    console.log(URL2)
    fetch(URL2)
    .then(response=> {
      if (response.ok) return response.json()
      throw new Error(`${error.message}`)})
    .then(json=>displayVideo(json))
    .catch (error=> $('.sub-container3').html('Invalid Region Code'))

    const URL3= `${geoURL}&lat=${searchedTerm.latitude}&long=${searchedTerm.longitude}`
    fetch(URL3)
    .then(response=> {
      if (response.ok) return response.json()
      throw new Error(`${error.message}`)})
    .then(json=>$('.date').html(`${json['date_time_txt']}`))
    .catch(error=>$('.date').html(`${d}`))

    getWikiImage(searchedTerm);
    getCityCapsuleData(searchedTerm);

  })
}

function handleDate() {
  $('main').on('change','#formDate', event=> {
    let fromDate=$('#fromDate').val();
    console.log(fromDate);
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