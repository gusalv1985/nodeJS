var response = require("../shared/response");

var TYPES = require('tedious').TYPES;

 function estadoRepository(dbContext) {

    function getA(req, res) {
        var parameters = [];
    
        dbContext.getQuery("select * from Estado", parameters, false, function (error, data){
                    return res.json(response(data, error));
                });
    }
   
    
    return {
            getAll: getA,
        }
    }

module.exports = estadoRepository;

