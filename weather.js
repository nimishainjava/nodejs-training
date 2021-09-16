var request= require('request')

module.exports= function(location, callback) { 
var trimloc = encodeURIComponent(location)
var apiurl = `http://api.openweathermap.org/data/2.5/weather?q=${trimloc}&appid=871fd4a11b39345b956c7946c6772844cb&units=metric`
    request({
        url:apiurl,
        json:true
    }, function(error, response, body){
        console.log(response.statusCode)
        if (response.statusCode == 200) {
            callback('its ' + body.main.temp + ' in ' + body.name);
        } else {
            callback('unable to fetch weather details');
        }
    }
)}