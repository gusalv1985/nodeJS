var response = require("../shared/response");

var TYPES = require('tedious').TYPES;

 function equipoRepository(dbContext) {

    function getA(req, res) {
        var parameters = [];
    
        dbContext.getQuery("select * from Equipos", parameters, false, function (error, data){
                    return res.json(response(data, error));
                });
    }
    function get(req, res, next) {
           if (req.params.equipoId) {
                var parameters = [];
                    parameters.push({ name: 'id_Sec', type: TYPES.Int, val: req.params.equipoId });
                   
                    var query = "select * from Equipos where id_Sec = @id_Sec"
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
            parameters.push({ name: 'id_Art', type: TYPES.VarChar, val: req.body.id_Art });
            parameters.push({ name: 'id_Estado', type: TYPES.VarChar, val: req.body.id_Estado });
            parameters.push({ name: 'nInventario', type: TYPES.VarChar, val: req.body.nInventario });
            parameters.push({ name: 'Remito_Factura', type: TYPES.VarChar, val: req.body.Remito_Factura });
            parameters.push({ name: 'id_OC', type: TYPES.VarChar, val: req.body.id_OC });
            parameters.push({ name: 'Obvs', type: TYPES.VarChar, val: req.body.Obvs });
            parameters.push({ name: 'id_Sec', type: TYPES.VarChar, val: req.body.id_Sec });
            parameters.push({ name: 'NoSerial', type: TYPES.VarChar, val: req.body.NoSerial });
            parameters.push({ name: 'FechaAlta', type: TYPES.VarChar, val: req.body.FechaAlta });
            parameters.push({ name: 'Cantidad', type: TYPES.VarChar, val: req.body.Cantidad });
          
            dbContext.post("InsertOrUpdateEquipo", parameters, function (error, data) {
                return res.json(response(data, error));
    
            });
        }
    
        function _delete(req, res) {    
    
                     var parameters = [];
            
                     if (req.data.serial) {
                         var parameters = [];
            
                         parameters.push({ name: 'serial', type: TYPES.Int, val: req.data.id_equipo });
            
                         var query = "delete from equipo where serial = @serial"
            
                         dbContext.getQuery(query, parameters, false, function (error, data, rowCount) {
                             if (rowCount > 0) {
                                 return res.json('el equipo a sido borrado');
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
    
             dbContext.post("InsertOrUpdateEquipo", parameters, function (error, data) {
                 return res.json(response(data, error));
             });
         }
    
     function find(req, res, next) {
    
        if (req.params.equipoId) {
            var parameters = [];
           
             parameters.push({ name: 'id_Sec', type: TYPES.Int, val: req.params.equipoId });
    
             var query = "select * from Equipos where id_Sec = @id_Sec"
    
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

module.exports = equipoRepository;

