var response = require("../shared/response");

var TYPES = require('tedious').TYPES;

 function usuariosRepository(dbContext) {

    function getA(req, res) {
        var parameters = [];
    
        dbContext.getQuery("select * from Usuarios", parameters, false, function (error, data){
                    return res.json(response(data, error));
                });
    }
    function get(req, res, next) {
           if (req.params.usuariosId) {
                var parameters = [];
                    parameters.push({ name: 'Id_Usuario', type: TYPES.Int, val: req.params.usuariosId });
                    var query = "select * from Usuarios where Id_Usuario = @Id_Usuario"
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
            parameters.push({ name: 'Nombre_Usuario', type: TYPES.VarChar, val: req.body.Nombre_Usuario });
            parameters.push({ name: 'Usuario', type: TYPES.VarChar, val: req.body.Usuario });
            parameters.push({ name: 'Pass', type: TYPES.VarChar, val: req.body.Pass });
            parameters.push({ name: 'Nivel_Seguridad', type: TYPES.Int, val: req.body.Nivel_Seguridad });
          
            dbContext.post("InsertOrUpdateUsuarios", parameters, function (error, data) {
                return res.json(response(data, error));
    
            });
        }
    
        function _delete(req, res) {    
    
                     var parameters = [];
            
                     if (req.data.id_usuarios) {
                         var parameters = [];
            
                         parameters.push({ name: 'Id_Usuario', type: TYPES.Int, val: req.data.id_usuarios });
            
                         var query = "delete from Usuarios where Id_Usuario = @Id_Usuario"
            
                         dbContext.getQuery(query, parameters, false, function (error, data, rowCount) {
                             if (rowCount > 0) {
                                 return res.json('el usuario a sido borrado');
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
    
             dbContext.post("InsertOrUpdateUsuarios", parameters, function (error, data) {
                 return res.json(response(data, error));
             });
         }
    
     function find(req, res, next) {
    
        if (req.params.usuariosId) {
            var parameters = [];
    
             parameters.push({ name: 'Id_Usuario', type: TYPES.Int, val: req.params.usuariosId });
    
             var query = "select * from Usuarios where Id_Usuario = @Id_Usuario"
    
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

module.exports = usuariosRepository;

