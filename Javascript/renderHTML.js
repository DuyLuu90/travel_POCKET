function renderHomePage(city,country) {
    return(`
    <h3> Welcome to ${city}, ${country} </h3>
    <div>
      <div class='container one'>
    
      </div>
  
      <div class='container two'>
        <div class='sub-container'>
        CITY IMAGE
        </div>
  
        <div class='sub-container2'>

          
        </div>
  
        <div class='sub-container3'>
          <p>Top 5 trending videos in ${country} </p>
          <div id='videoList'></div>
        </div>
          
      </div> 
  
      <div class='container three'>
        <h4> Travel tools </h4>
        <p> Enter the date to explore your travel options </p>
        <form>
          <input type='date' id='check-in' required>
          <input type='date' id='check-out'>
          <div class='button'>
            <button type='submit' id='flight'> Check Flights</button>
            <button type='submit' id='hotel'> Check Hotels </button>
          </div>
        </form>
      <div>
  
    </div>
   
    `)
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
  let html= `
    <h3>${response.name}&nbsp;&nbsp; <i class="fa fa-thermometer"></i> </h3>
    <p class='date'> ${d} </p>
    <p class='currentTemp'> <i src='http://openweathermap.org/img/wn/${response.weather.icon}@2x.png' alt='wxIcon'> ${response.main.temp}<span>&#8451;</span> </p>
    <p> ${response.main['temp_min']}<span>&#8451;</span>/ ${response.main['temp_max']}<span>&#8451;</span> &nbsp;&nbsp; Feels like ${response.main['feels_like']}<span>&#8451;</span> </p>
    <p> ${response.weather.description.toUpperCase()} <span>&#8451;</span> Humidity ${response.main.humidity}% </p> `
    console.log(html);
  $('.sub-container2').html(html);
}

/*
function renderFlightPage() {
  
}

function renderHotelPage() {
  
}
*/