'use strict';
const searchedTerm= {
  countryCode: '',
  countryName: '',
  cityName: '',
  latitude: '',
  longitude: '',
  airportCode: '',
  airportName: ''}

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
    searchedTerm.latitude= Number(`${cityList1[index1].lat}`)
    searchedTerm.longitude= Number(`${cityList1[index1].lon}`)
    let index2=cityList2.findIndex(obj=>obj.airportCode===searchedTerm.airportCode)
    searchedTerm.airportName=cityList2[index2].airportName;
    console.log(searchedTerm);

    //refer to renderHTML.js for more info
    renderHomePage(searchedTerm.cityName,searchedTerm.countryName,searchedTerm.airportName);

    //all get API functions are expressed in getAPI.js file
    getCityCapsuleData(searchedTerm);
    getSafetyInfo(searchedTerm);
    getMap(searchedTerm.latitude,searchedTerm.longitude);
    getWikiImage(searchedTerm);
    getWxInfo(searchedTerm);
    getLocalTime(searchedTerm);
    getTrendingVideos(searchedTerm)
  
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
    let x=$('#fromDate').val().split('-').reverse();
    let y=$('#toDate').val().split('-').reverse();

    let airport= searchedTerm.airportCode;
    let fromDate=x.join('/');    
    let toDate=y.join('/');

    getFlights(airport,fromDate,toDate);    
  })
}

function runApp() {
  handleHomeClicked()
  displayCountries();
  pageLoad();
  displayCity();
  handleExploreButton();
  handleDate();
  handleFlightSearchSubmitted();
}

$(runApp);