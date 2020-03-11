function renderHomePage(city,country,airport) {
    $('.cityTitle').html(`Welcome to ${city}, ${country}`);
    $('.js-weather h3').html(`${airport}&nbsp;&nbsp;<i class="fa fa-thermometer"></i>`);
    $('.js-video h3').html(`Top 5 trending videos in ${country}`);
    $('.homeImage').hide();
  }
/*
function displayWikiResults(json) {
  console.log(json);
  let wikiTextObject = json.query.pages;
  for (let key in wikiTextObject) {
    let content= wikiTextObject[key].extract;
    if (!content) {
      $(".wikiResults").html(`
      <p>'${searchedTerm.cityName}' did not match any document. Please check again later!</p>`)}
    else if (content===`${searchedTerm.cityName} most often refers to:`) {
      getWikiSuggestions(searchedTerm.cityName)
    }
    else {
      $(".wikiResults").html(`<p>${content}</p>`) }  
  }
} */

function displaySuggestion(response) {
  let searchedTerm= response[0]
  let texts= response[1];
  let links = response[3];
  let html='';
  if (texts.length===0 || links.length===0) {
    $(".wikiResults").html(`
      <p>'${searchedTerm}' did not match any document. Please check again later!</p>`)}
  else {
    for (let i=0; i<links.length; i++) {
      html += `<a class='wikiLinks' href='${links[i]}' target='_blank'>${texts[i]}</a>`
    }
    $('.wikiResults').html(html)}
}

function displaySafetyInfo(response) {
  let array=response.safety.safetyInfo;
  let html=array.map(obj=>`
  <div>
    <h4>${obj.category}</h4>
    <p>${obj.description}</p>
  </div>`)
  let x=html.join('');
  $('.js-safety').html(
  `<h3> Safety information in ${response.name}</h3>
  <div> ${x} </div>`)
}

function displayImageResults(json) {
  let wikiImageObject = json.query.pages;
  for (let key in wikiImageObject) {  
    if (wikiImageObject[key].hasOwnProperty('thumbnail')){
      let content=wikiImageObject[key].thumbnail.source;
      $(".wikiImage").html(`
      <img src="${content}" alt="Image">`)}

    else $(".wikiImage").html('No image available')
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
  let x=html.join('');
  $('#videoList').html(`${x}`);
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
  $('#flightHeader').html('Top flight deals for you')
  let results=response.data;
  let html= results.map(obj=> 
    /*
    let desCityCode=obj.flyTo;
    let desCountry=obj.country.name;
    */
    `<div class='flight'>
      
      <div class='summary'>
        <p>${obj.cityFrom} &rarr; </p>
        <h2>${obj.cityTo}</h2>
        <p>${obj.countryTo.name}</p>
        <p>Duration: ${obj['fly_duration']}</p>
        <hr>
        <div class='flightFooter'>
          <p> From $${obj.price}</p>
          <img src='http://pics.avs.io/140/40/${obj.airlines[0]}.png' class='logo' alt='${obj.airlines[0]}'> 
        </div>
      </div>

      <div class='booking'>
        <a href='${obj['deep_link']}' target="_blank">Book now</a>
      </div>
      
    </div>` 
  )
  let x=html.join('');
  $('.flights').html(`${x}`);
}

/*
function renderHotelPage() {
  
}
*/