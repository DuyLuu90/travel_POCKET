/*
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
    console.log(url);
    fetch(url).then(resp => {
        if(resp.ok) {
          console.log("Wiki json",resp);
          return resp.json();}
          throw new Error(resp.statusText);})
    .then(respJson=>displayWikiResults(respJson))
    .catch(error=>console.log(error))
}*/

function getWikiSuggestions(string) {
    URL= wikiOpenSearch+string;
    fetch(URL)
    .then(response=>response.json())
    .then(response=>{
        displaySuggestion(response)})
    .catch(error=>console.log(error))
}

function getWikiImage(string) {
    let params = {
      action: "query",
      format: "json",
      origin: "*",
      prop: "pageimages",
      pithumbsize: 300,
      titles: string,
    }
    const wikiImageQueryString = $.param(params);
    const url = `${wikiSearchUrl}?${wikiImageQueryString}`;
    fetch(url).then(resp => {
      if(resp.ok) {
        return resp.json();
      }
      throw new Error(resp.statusText);})
    .then(respJson=>{
      displayImageResults(respJson)})
    .catch(error=>console.log(error))
  }

function getMap(num1,num2) {
    let cord= {lat: num1, lng: num2}
    let options= {
      center: cord,
      zoom: 10,
    }
    let map = new google.maps.Map(document.getElementById('map'), options);
    let marker = new google.maps.Marker({position: cord, map: map});
}

function getSafetyInfo(searchedTerm) {
    const options = {
        headers: new Headers
        ({'X-Auth-API-Key': 'shdz5pjecya5hf662ngs9t23'})}
    const URL4= `${tugoURL}/${searchedTerm.countryCode}`;
       
    fetch(URL4,options)
    .then(response=> {
        if (response.ok) return response.json()
        throw new Error(`${error.message}`)})
    .then(json=>{
        console.log(json)
        displaySafetyInfo(json)})
    .catch(error=> {
        console.log(error);
        $('.js-safety').html('Sorry safety infomration is currently not available')})
}

function getWxInfo(searchedTerm) {
    const URL1= `${wxURL}lat=${searchedTerm.latitude}&lon=${searchedTerm.longitude}`
    fetch(URL1)
    .then(response=> {
      if (response.ok) return response.json()
      throw new Error (`${response.message}`)  })
    .then(json=>{ console.log(json);
      displayWeather(json)})
    .catch (error=> $('.sub-container2').html('Sorry, weather information is not available'))
}

function getLocalTime(searchedTerm) {
    const URL3= `${geoURL}&lat=${searchedTerm.latitude}&long=${searchedTerm.longitude}`
    fetch(URL3)
    .then(response=> {
      if (response.ok) return response.json()
      throw new Error(`${error.message}`)})
    .then(json=> {
      $('#fromDate').attr('min',`${json.date}`)
      $('.date').html(`${json['date_time_txt']}`)})
    .catch(error=>$('.date').html(`${d}`))
}

function getTrendingVideos(searchedTerm) {
    const URL2=`${ytURL}${searchedTerm.countryCode}`
    fetch(URL2)
    .then(response=> {
      if (response.ok) return response.json()
      throw new Error('There is an error')})
    .then(json=>displayVideo(json))
    .catch (error=> {
      console.log(error);
      $('.sub-container3').html('Invalid Region Code')})
}

function getFlights(airport,fromDate,toDate) {
    let flightParam = {
        "fly_from" : `${airport}`,
        'date_from': `${fromDate}`,
        'date_to': `${toDate}`}
  
    let URL3= flyURL+'&'+ $.param(flightParam)
    fetch(URL3)
    .then(response=> {
        if (response.ok) return response.json()
        throw new Error(`${error.message}`)})
    .then(json=>{
        console.log(json)
        displayFlights(json)})
    .catch (error=> console.log(error));
}