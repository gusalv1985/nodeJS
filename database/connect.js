var Connection = require('tedious').Connection;
var config = require("./config")

var connection = new Connection(config.config);
connection.on('connect', function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('Connect');
    }
});
module.exports = connection

