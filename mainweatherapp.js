var weather = require('./weather.js')

var location = require('./location.js')

var argv = require('yargs')
.option(
    'location', {
        alias: 'l',
        demand: true,
        description: 'Enter city with country code to get live temperature',
        type: 'string'
    }
).help('help').argv

weather(argv.l, function(callme) {
    console.log(callme);
})

location(function(loc) {
    console.log(loc);
})