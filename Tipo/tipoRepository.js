var response = require("../shared/response");

var TYPES = require('tedious').TYPES;

 function tipoRepository(dbContext) {

    function getA(req, res) {
        var parameters = [];
    
        dbContext.getQuery("select * from Segmento", parameters, false, function (error, data){
                    return res.json(response(data, error));
                });
    }
    function get(req, res, next) {
           if (req.params.tipoId) {
                var parameters = [];
                    parameters.push({ name: 'id_Segmento', type: TYPES.Int, val: req.params.tipoId });
                    var query = "select * from Segmento where id_Segmento = @id_Segmento"
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
          
            dbContext.post("InsertOrUpdateTipo", parameters, function (error, data) {
                return res.json(response(data, error));
    
            });
        }
    
        function _delete(req, res) {    
    
                     var parameters = [];
            
                     if (req.data.id_Segmento) {
                         var parameters = [];
            
                         parameters.push({ name: 'id_Segmento', type: TYPES.Int, val: req.data.id_Segmento });
            
                         var query = "delete from Segmento where id_Segmento = @id_Segmento"
            
                         dbContext.getQuery(query, parameters, false, function (error, data, rowCount) {
                             if (rowCount > 0) {
                                 return res.json('el tipo a sido borrado');
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
    
             dbContext.post("InsertOrUpdateTipo", parameters, function (error, data) {
                 return res.json(response(data, error));
             });
         }
    
     function find(req, res, next) {
    
        if (req.params.tipoId) {
            var parameters = [];
    
             parameters.push({ name: 'id_Segmento', type: TYPES.Int, val: req.params.tipoId });
    
             var query = "select * from Segmento where id_Segmento = @id_Segmento"
    
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

module.exports = tipoRepository;

