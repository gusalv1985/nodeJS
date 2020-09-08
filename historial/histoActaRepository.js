var response = require("../shared/response");

var TYPES = require('tedious').TYPES;

 function histoActaRepository(dbContext) {


    function get(req, res, next) {
           if (req.params.histoActaId) {
                var parameters = [];
                    parameters.push({ name: 'serial', type: TYPES.VarChar, val: req.params.histoActaId });
                    var query = "select r.id_Remito, r.fecha, s.Detalle as 'De', se.Detalle as 'Para' from Movimientos m inner join Remito r on m.id_Remito = r.id_Remito inner join Sector s on s.id_Sec = r.De inner join Sector se on se.id_Sec = r.Para where m.nSerie = @serial  order by r.fecha asc"
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
    
        if (req.params.histoActaId) {
            var parameters = [];
    
             parameters.push({ name: 'serial', type: TYPES.VarChar, val: req.params.histoActaId });
    
             var query = "select r.id_Remito, r.fecha, s.Detalle as 'De', se.Detalle as 'Para' from Movimientos m inner join Remito r on m.id_Remito = r.id_Remito inner join Sector s on s.id_Sec = r.De inner join Sector se on se.id_Sec = r.Para where m.nSerie = @serial  order by r.fecha asc"

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

module.exports = histoActaRepository;

