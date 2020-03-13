function displayCountries(json){
  let country=json.country;
  let x= country.map(obj=>`
  (<option value="${obj.code}">${obj.name}</option>>`)
  let html=x.join('');
  $('#countryGroup2').append(html)
}

function renderCityList() {
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
  let x = store.map(item=>`
  <option value='${item.airportCode}'>${item.city}(${item.airportCode})</option>`)
  let html= x.join('');
  $('#city').html(html);        
}

function renderHomePage(city,country,airport) {
    $('.cityTitle').html(`Welcome to ${city}, ${country}`);
    $('.js-weather h3').html(`${airport}&nbsp;&nbsp;<i class="fa fa-thermometer"></i>`);
    $('.js-video h3').html(`Top 5 trending videos in ${country}`);
    $('.travel p').html(`Enter the date to find the best flight deals from ${airport}`)
    $('.homeImage').hide();
  }

  async function displaySuggestion(response) {
    let searchedTerm= response[0]
    let texts= response[1];
    let links = response[3];
    let html='';
    if (texts.length===0 || links.length===0) {
      $(".wikiResults").html(`
        <p>'${searchedTerm}' did not match any document. Please check again later!</p>`)}
    else {
      for (let i=0; i<links.length; i++) {
        let url= await getWikiImage(texts[i]);
        let wikiImage;
        if (url) wikiImage= `<img src='${url}' alt='image'>`
        else wikiImage= 'NO PAGE IMAGE';

        let extract= await getWikiExtract(texts[i]);
        html += `
          <a class='wikiLinks' href='${links[i]}' target='_blank'>${texts[i]}
            <div class='tooltip'>
              <div class='wikiDescription'>${extract}</div>
              <div class='wikiImage'>${wikiImage}</div>
            </div>
          </a>`
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
  $('#flightHeader').html('Top destinations')
  let results=response.data;
  let html= results.map(obj=> 
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
    </div>` )
  let x=html.join('');
  $('.flights').html(`${x}`);
}