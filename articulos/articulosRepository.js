var response = require("../shared/response");

var TYPES = require('tedious').TYPES;

 function articulosRepository(dbContext) {

    function getA(req, res) {
        var parameters = [];
    
        dbContext.getQuery("select * from Articulos", parameters, false, function (error, data){
                    return res.json(response(data, error));
                });
    }
    function get(req, res, next) {
           if (req.params.articulosId) {
                var parameters = [];
                    parameters.push({ name: 'id_Art', type: TYPES.Int, val: req.params.articulosId });
                    var query = "select * from Articulos where id_Art = @id_Art"
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
            parameters.push({ name: 'id_Marca', type: TYPES.Int, val: req.body.id_Marca });
            parameters.push({ name: 'id_Segmento', type: TYPES.Int, val: req.body.id_Segmento });
          
            dbContext.post("InsertOrUpdateArticulos", parameters, function (error, data) {
                return res.json(response(data, error));
    
            });
        }
    
        function _delete(req, res) {    
    
                     var parameters = [];
            
                     if (req.data.id_articulos) {
                         var parameters = [];
            
                         parameters.push({ name: 'Id_Art', type: TYPES.Int, val: req.data.id_articulos });
            
                         var query = "delete from Articulos where id_Art = @Id_Art"
            
                         dbContext.getQuery(query, parameters, false, function (error, data, rowCount) {
                             if (rowCount > 0) {
                                 return res.json('el articulos a sido borrado');
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
    
             dbContext.post("InsertOrUpdateArticulos", parameters, function (error, data) {
                 return res.json(response(data, error));
             });
         }
    
     function find(req, res, next) {
    
        if (req.params.articulosId) {
            var parameters = [];
    
             parameters.push({ name: 'id_Art', type: TYPES.Int, val: req.params.articulosId });
    
             var query = "select * from Articulos where id_Art = @id_Art"
    
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

module.exports = articulosRepository;

