var response = require("../shared/response");

var TYPES = require('tedious').TYPES;

 function tipoPuestoRepository(dbContext) {

    function getA(req, res) {
        var parameters = [];
    
        dbContext.getQuery("select * from tipoPuesto", parameters, false, function (error, data){
                    return res.json(response(data, error));
                });
    }
    function get(req, res, next) {
           if (req.params.tipoPuestoId) {
                var parameters = [];
                    parameters.push({ name: 'id_TipoSector', type: TYPES.Int, val: req.params.tipoPuestoId });
                    var query = "select * from tipoPuesto where id_TipoSector= @id_TipoSector"
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
          
            dbContext.post("InsertOrUpdatetipoPuesto", parameters, function (error, data) {
                return res.json(response(data, error));
    
            });
        }
    
        function _delete(req, res) {    
    
                     var parameters = [];
            
                     if (req.data.id_tipoPuesto) {
                         var parameters = [];
            
                         parameters.push({ name: 'id_TipoSector', type: TYPES.Int, val: req.data.id_tipoPuesto });
            
                         var query = "delete from tipoPuesto where id_TipoSector = @id_TipoSector"
            
                         dbContext.getQuery(query, parameters, false, function (error, data, rowCount) {
                             if (rowCount > 0) {
                                 return res.json('la tipoPuesto a sido borrada');
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
    
             dbContext.post("InsertOrUpdatetipoPuesto", parameters, function (error, data) {
                 return res.json(response(data, error));
             });
         }
    
     function find(req, res, next) {
    
        if (req.params.tipoPuestoId) {
            var parameters = [];
    
             parameters.push({ name: 'id_TipoSector', type: TYPES.Int, val: req.params.tipoPuestoId });
    
             var query = "select * from tipoPuesto where id_TipoSector = @id_TipoSector"
    
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

module.exports = tipoPuestoRepository;

