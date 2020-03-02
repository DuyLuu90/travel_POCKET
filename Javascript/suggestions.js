/*

// refer to <input onkeyup="jump()">

function displaySuggestion(respone) {
    let suggesstions = respone[1];
    let html= '';
    for (let i=0; i<suggesstions.length& i<5; i++) {
      html= html.concat(`<li>${suggesstions[i]}</li>`)
    }
    console.log(html);
    $('#display').html(html);
  }
  
  function getSuggestion(replaced) {
    URL=`${wikiEndpoint}${replaced}`;
    console.log(URL);
  
    fetch(URL)
    .then(response=>response.json())
    .then(respone=>displaySuggestion(respone))
     .catch(error=>alert(error.message))
  }

  function jump() {

    let character= document.getElementById("search-box").value ;
    let str= character;
    let replaced = str.split(' ').join('_');
    if (replaced == '') $('#display').hide()
    else getSuggestion(replaced);
  }*/