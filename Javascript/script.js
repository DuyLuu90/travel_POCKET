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

/*
function handleSeachButton() {
  $('#search').submit(event => {
    event.preventDefault();
    let searchedTerm1=$('#search-box').val().toUpperCase();
    let html= renderHomePage(searchedTerm1);
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
  pageLoad ();
  handleDate();
  handleFlightSearchSubmitted();
}

$(runApp); 