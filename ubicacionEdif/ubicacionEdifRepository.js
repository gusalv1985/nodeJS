var response = require("../shared/response");

var TYPES = require('tedious').TYPES;

 function ubicacionEdifRepository(dbContext) {

    function getA(req, res) {
        var parameters = [];
    
        dbContext.getQuery("select * from UbicacionEdificio", parameters, false, function (error, data){
                    return res.json(response(data, error));
                });
    }
    function get(req, res, next) {
           if (req.params.ubicacionEdifId) {
                var parameters = [];
                    parameters.push({ name: 'Id_Ubicacion', type: TYPES.Int, val: req.params.ubicacionEdifId });
                    var query = "select * from UbicacionEdificio where Id_Ubicacion = @Id_Ubicacion"
                    dbContext.getQuery(query, parameters, false, function (error, data) {
                    if (data) {
                        res.json(response(data, error));
                        req.data = data[0];
                           return next();
                    }
                    return res.sendStatus(404);
                });
            } 
        } 
    function post(req, res) {
    var parameters = [];
            parameters.push({ name: 'Detalle', type: TYPES.VarChar, val: req.body.Detalle });
          
            dbContext.post("InsertOrUpdateUbicacionEdif", parameters, function (error, data) {
                return res.json(response(data, error));
    
            });
        }
    
        function _delete(req, res) {    
    
                     var parameters = [];
            
                     if (req.data.id_ubicacionEdif) {
                         var parameters = [];
            
                         parameters.push({ name: 'Id_ubicacionEdif', type: TYPES.Int, val: req.data.id_ubicacionEdif });
            
                         var query = "delete from UbicacionEdificio where Id_Ubicacion = @Id_Ubicacion"
            
                         dbContext.getQuery(query, parameters, false, function (error, data, rowCount) {
                             if (rowCount > 0) {
                                 return res.json('la ubicacionEdif a sido borrada');
                             }
                             return res.sendStatus(404);
                         });
                     }
                 }
    
        function put(req, res) {
    
             var parameters = [];
    
             Object.entries(req.data).forEach((property) => {
    
                 if (req.body[property[0]]) {
                     parameters.push(
                         {
                             name: property[0],
                             val: req.body[property[0]],
                             type: TYPES.VarChar
                         });
                 } else {
    
                     parameters.push(
                         {
                             name: property[0],
                             val: property[1],
                             type: TYPES.VarChar
                         });
                 }
             });
    
             dbContext.post("InsertOrUpdateubicacionEdif", parameters, function (error, data) {
                 return res.json(response(data, error));
             });
         }
    
     function find(req, res, next) {
    
        if (req.params.ubicacionEdifId) {
            var parameters = [];
    
             parameters.push({ name: 'Id_Ubicacion', type: TYPES.Int, val: req.params.ubicacionEdifId });
    
             var query = "select * from UbicacionEdificio where Id_Ubicacion = @Id_Ubicacion"
    
           dbContext.getQuery(query, parameters, false, function (error, data) {
              if (data) {
                   req.data = data[0];
                    return next();
                 }
               return res.sendStatus(404);
            });
         }
     }
    
    
    return {
            getAll: getA,
            get: get,
            post: post,
            delete: _delete,
            intercept: find, 
            put: put,
        }
    }

module.exports = ubicacionEdifRepository;

