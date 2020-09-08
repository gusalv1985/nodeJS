var response = require("../shared/response");

var TYPES = require('tedious').TYPES;

 function ordenCompraRepository(dbContext) {

    function getA(req, res) {
        var parameters = [];
    
        dbContext.getQuery("select * from OrdendeCompra", parameters, false, function (error, data){
                    return res.json(response(data, error));
                });
    }
    function get(req, res, next) {
           if (req.params.ordenCompraId) {
                var parameters = [];
                    parameters.push({ name: 'Id_OC', type: TYPES.Int, val: req.params.ordenCompraId });
                    var query = "select * from OrdendeCompra where Id_OC = @Id_OC"
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
            parameters.push({ name: 'Fecha', type: TYPES.DateTime, val: req.body.Fecha });
            parameters.push({ name: 'Proveedor', type: TYPES.Int, val: req.body.Proveedor });
            parameters.push({ name: 'Obvservaciones', type: TYPES.VarChar, val: req.body.Obvservaciones });
            parameters.push({ name: 'OdeCompra', type: TYPES.VarChar, val: req.body.OdeCompra });
          
            dbContext.post("InsertOrUpdateOrdenCompra", parameters, function (error, data) {
                return res.json(response(data, error));
    
            });
        }
    
        function _delete(req, res) {    
    
                     var parameters = [];
            
                     if (req.data.Id_OC) {
                         var parameters = [];
            
                         parameters.push({ name: 'Id_OC', type: TYPES.Int, val: req.data.Id_OC });
            
                         var query = "delete from OrdendeCompra where Id_OC = @Id_OC"
            
                         dbContext.getQuery(query, parameters, false, function (error, data, rowCount) {
                             if (rowCount > 0) {
                                 return res.json('la Orden de Compra a sido borrada');
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
    
             dbContext.post("InsertOrUpdateOrdenCompra", parameters, function (error, data) {
                 return res.json(response(data, error));
             });
         }
    
     function find(req, res, next) {
    
        if (req.params.ordenCompraId) {
            var parameters = [];
    
             parameters.push({ name: 'Id_OC', type: TYPES.Int, val: req.params.ordenCompraId });
    
             var query = "select * from OrdendeCompra where Id_OC = @Id_OC"
    
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

module.exports = ordenCompraRepository;

