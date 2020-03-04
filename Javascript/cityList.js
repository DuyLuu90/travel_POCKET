function getCountryCode () {
    $('#country').change(event=>{
        let code= $('#country').val();
        console.log(code);
    })
}