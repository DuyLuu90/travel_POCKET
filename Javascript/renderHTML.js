function renderHomePage(city,country,airport) {
    $('.cityTitle').html(`Welcome to ${city}, ${country}`);
    $('.js-weather h3').html(`${airport}&nbsp;&nbsp;<i class="fa fa-thermometer"></i>`);
    $('.js-video h3').html(`Top 5 trending videos in ${country}`);
    $('.homeImage').hide();
  }

/*
function displayPageImage(response) {
  let x=json.query.pages.thumbnail.source;
  $('.pageImages').html(`<img src='${x}' alt='city image'>`)
}*/

function displayWikiResults(json) {
  console.log(json);
  let wikiTextObject = json.query.pages;
  for (let key in wikiTextObject) {
    if (key==='-1') {
      $(".one").html(`<p>${searchedTerm.cityName} is a very nice city!</p>`)
    }
    else {
      let content= wikiTextObject[key].extract;
      console.log(content);
      $(".one").html(`<p>${content}</p>`) }  
  }
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
        <img src="${wikiImageObject[key].thumbnail.source}" alt="Image of ${searchedTerm.cityName}">`)}
  }
}

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
