'use strict';
const searchedTerm= {
  countryCode: '',
  countryName: '',
  cityName: '',
  latitude: '',
  longitude: '',
  airportCode: '',
  airportName: ''}

function updateSearchTerm(cityList1,cityList2) {
  let CC=$('#country').val();
  searchedTerm.countryCode= CC;
  searchedTerm.countryName=$('#country option:selected').text(); 
  searchedTerm.cityName=$('#city option:selected').text().slice(0,-5);
  searchedTerm.airportCode=$('#city').val();
  let index1=cityList1.findIndex(obj=>obj.code===searchedTerm.airportCode);
  searchedTerm.latitude= Number(`${cityList1[index1].lat}`)
  searchedTerm.longitude= Number(`${cityList1[index1].lon}`)
  let index2=cityList2.findIndex(obj=>obj.airportCode===searchedTerm.airportCode)
  searchedTerm.airportName=cityList2[index2].airportName; 
}

function handleHomeClicked() {
  $('#reload').click(event=>location.reload())
}

function handleExploreButton() {
  $('#citySearch').submit(event=>{
    event.preventDefault();
    $('.js-home').removeClass('hidden');
    $('#flightHeader').empty();
    $('.flights').empty();
    console.log(searchedTerm);

    //refer to renderHTML.js for more info
    renderHomePage(searchedTerm.cityName,searchedTerm.countryName,searchedTerm.airportName);

    //all get API functions are expressed in getAPI.js file
    getWikiSuggestions(searchedTerm.cityName);
    getSafetyInfo(searchedTerm);
    getMap(searchedTerm.latitude,searchedTerm.longitude);
    getWxInfo(searchedTerm);
    getLocalTime(searchedTerm);
    getTrendingVideos(searchedTerm)
  })
}

function handleWikiSearch() {
  $('#search-box').keydown(event=>{
    if (event.keyCode === 10 || event.keyCode === 13) {
      event.preventDefault();
    }
    let search=$('#search-box').val();
    if (search.length ===0) getWikiSuggestions(searchedTerm.cityName)
    else getWikiSuggestions(search);
  })
}

function handleDate() {
  $('#travelDate').on('change','#fromDate',event=> {
    let fromDate=$('#fromDate').val();
    $('#toDate').attr('min',`${fromDate}`);})
}

function handleFlightSearchSubmitted() {
  $('main').on('submit', '#travelDate', event=>{
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
  handleHomeClicked();
  getSelections();
  handleExploreButton();
  handleWikiSearch();
  handleDate();
  handleFlightSearchSubmitted();
}

$(runApp);