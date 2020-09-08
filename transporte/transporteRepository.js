var response = require("../shared/response");

var TYPES = require('tedious').TYPES;

function transporteRepository(dbContext) {
    function getAll(req, res) {
        var params = [];

        dbContext.getQuery("select * from Transporte", params, false, function(error, data) {

            return res.json(response(data, error));
        });
    }

    return {getAll};
}

module.exports = transporteRepository;