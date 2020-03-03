/*
function displayCity () {

    fetch ('Resources/airportList.json')
    .then (response => {
        let code=$('#country').val();
        for (let i=0; i<response.length; i++) {
            if (response[i].contryCode === code) {
                $('#city').append(`
                <option value='${response[i].airportCode}'>${response[i].airportName} (${response[i].airportCode})</option>
                `)
            }
        }
    })
}*/

function displayCity () {
    let code=$('#country').val();
    console.log (code);
}