function renderHomePage(city) {
    return(`
    <h3> Welcome to ${city}
    <div>
  
      <div class='container one'>
        <div class='sub-container'>
        CITY IMAGE
        </div>
  
        <div class='sub-container'>
        CURRENT WEATHER
        </div>
  
        <div class='sub-container'>
        OTHER INTERESTING INFO
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

/*
function renderFlightPage() {
  
}

function renderHotelPage() {
  
}
*/