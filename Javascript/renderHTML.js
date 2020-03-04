function renderHomePage(city,country) {
    return(`
    <h3> Welcome to ${city}, ${country} </h3>
    <div>
  
      <div class='container one'>
        <div class='sub-container'>
        CITY IMAGE
        </div>
  
        <div class='sub-container'>
        CURRENT WEATHER
        </div>
  
        <div class='sub-container3'>
          <p>Top 5 trending videos in ${country} </p>
          <div id='videoList'></div>
        </div>
          
      </div> 
  
      <div class='container two'>
  
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

/*
function renderFlightPage() {
  
}

function renderHotelPage() {
  
}
*/