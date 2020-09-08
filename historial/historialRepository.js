var response = require("../shared/response");

var TYPES = require('tedious').TYPES;

 function historialRepository(dbContext) {


    function get(req, res, next) {
           if (req.params.historialId) {
                var parameters = [];
                    parameters.push({ name: 'serial', type: TYPES.VarChar, val: req.params.historialId });
                    var query = "select a.Detalle, eq.nInventario, es.Estado, eq.Remito_Factura, o.OdeCompra, o.Fecha, eq.Obvs  from Equipos eq  inner join  Articulos a on eq.id_Art = a.id_Art  inner join Estado es on eq.id_Estado = es.id_Estado  inner join OrdendeCompra o on eq.id_OC = o.Id_OC  where eq.serial = @serial"
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

    
     function find(req, res, next) {
    
        if (req.params.historialId) {
            var parameters = [];
    
             parameters.push({ name: 'serial', type: TYPES.VarChar, val: req.params.historialId });
    
             var query = "select a.Detalle, eq.nInventario, es.Estado, eq.Remito_Factura, o.OdeCompra, o.Fecha, eq.Obvs  from Equipos eq  inner join  Articulos a on eq.id_Art = a.id_Art  inner join Estado es on eq.id_Estado = es.id_Estado  inner join OrdendeCompra o on eq.id_OC = o.Id_OC  where eq.serial = @serial"

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
            get: get,
            intercept: find, 
        }
    }

module.exports = historialRepository;

