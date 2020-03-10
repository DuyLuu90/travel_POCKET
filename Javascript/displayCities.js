function pageLoad () {
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
    let html= generateCityOptions(store);
    $('#city').html(html);        
}

function displayCity() {
    $('#country').change(event=>pageLoad())
}

function generateCity(item) {
    return `
    <option value='${item.airportCode}'>${item.city}(${item.airportCode})</option>`
}

function generateCityOptions (store) {
    const items= store.map (item=>generateCity(item));
    return items.join("");
}
