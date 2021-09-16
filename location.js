var request = require('request')

var locationurl = 'http://ipinfo.io'

module.exports= function() {
    request(
        {
            url: locationurl,
            json: true
        }, function(error, response, body) {
            if (error) {
                console.log('unable to determine location');
            } else {
                console.log(body.city);
            }
        }
    )
}