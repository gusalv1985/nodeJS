var response = require("../shared/response");

var TYPES = require('tedious').TYPES;

 function sectorRepository(dbContext) {

    function getA(req, res) {
        var parameters = [];
    
        dbContext.getQuery("select * from Sector", parameters, false, function (error, data){
                    return res.json(response(data, error));
                });
    }
    function get(req, res, next) {
           if (req.params.sectorId) {
                var parameters = [];
                    parameters.push({ name: 'id_sector', type: TYPES.Int, val: req.params.sectorId });
                    var query = "select * from Sector where id_sec = @id_sector"
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
            parameters.push({ name: 'telefonos', type: TYPES.VarChar, val: req.body.telefonos });
            parameters.push({ name: 'id_TipoSector', type: TYPES.Int, val: req.body.id_TipoSector });
            parameters.push({ name: 'id_Dir', type: TYPES.Int, val: req.body.id_Dir });
            parameters.push({ name: 'StockPropio', type: TYPES.Bit, val: req.body.StockPropio});
            parameters.push({ name: 'Activo', type: TYPES.Bit, val: req.body.Activo });
            parameters.push({ name: 'PersonalPropio', type: TYPES.Bit, val: req.body.PersonalPropio });
            parameters.push({ name: 'Id_Ubicacion', type: TYPES.Int, val: req.body.Id_Ubicacion });
          
            dbContext.post("InsertOrUpdateSector", parameters, function (error, data) {
                return res.json(response(data, error));
    
            });
        }
    
        function _delete(req, res) {    
    
                     var parameters = [];
            
                     if (req.data.id_sector) {
                         var parameters = [];
            
                         parameters.push({ name: 'Id_sector', type: TYPES.Int, val: req.data.id_sector });
            
                         var query = "delete from Sector where id_sec = @Id_sector"
            
                         dbContext.getQuery(query, parameters, false, function (error, data, rowCount) {
                             if (rowCount > 0) {
                                 return res.json('el sector a sido borrado');
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
    
             dbContext.post("InsertOrUpdateSector", parameters, function (error, data) {
                 return res.json(response(data, error));
             });
         }
    
     function find(req, res, next) {
    
        if (req.params.sectorId) {
            var parameters = [];
    
             parameters.push({ name: 'id_sector', type: TYPES.Int, val: req.params.sectorId });
    
             var query = "select * from Sector where id_sec = @id_sector"
    
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

module.exports = sectorRepository;

