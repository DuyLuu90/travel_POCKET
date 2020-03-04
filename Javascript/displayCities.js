function displayCity() {
    $('#country').change(event=>{
        let store=[];
        let CC= $('#country').val();
        for (let i=0; i<cityList2.length; i++) {
            if (cityList2[i].countryCode===CC) store.push(cityList2[i])
        }
        for (let i=0; i<store.length; i++) {
            let x= store[i].airportCode;
            let index=cityList1.findIndex(obj=>obj.code===x);
            store[i].city = `${cityList1[index].city}`;
        }
        store.sort((a,b)=>a.city.localeCompare(b.city));


        console.log(CC);
        console.log(store);
        let html= generateCityOptions(store);
        $('#city').html(html);
    })
}

function generateCity(item) {
    return `
    <option value='${item.airportCode}'>${item.city}(${item.airportCode})</option>
    `
}

function generateCityOptions (store) {
    const items= store.map (item=>generateCity(item));
    return items.join("");
}
