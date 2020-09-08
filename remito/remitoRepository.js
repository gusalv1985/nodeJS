var response = require("../shared/response");

var TYPES = require('tedious').TYPES;

 function remitoRepository(dbContext) {

    function getA(req, res) {
        var parameters = [];
    
        dbContext.getQuery("select * from Remito", parameters, false, function (error, data){
                    return res.json(response(data, error));
                });
    }
    function get(req, res, next) {
           if (req.params.remitoId) {
                var parameters = [];
                    parameters.push({ name: 'id_Remito', type: TYPES.Int, val: req.params.remitoId });
                    //var query = "select se.Detalle as Para, Fecha, Contacto, s.Detalle as De, Observaciones,e.nInventario, t.Transporta, m.nSerie, a.Detalle from Remito r inner join Transporte t on r.Id_Transporte = t.Id_Transporte inner join Movimientos m on r.id_Remito = m.id_Remito  inner join Equipos e on m.nSerie = e.serial inner join Articulos a on e.id_Art = a.id_Art inner join Sector s on s.id_Sec = r.De inner join Sector se on se.id_Sec = r.Para where r.id_Remito =  @id_Remito"
                      var query = "select se.Detalle as Para, Fecha, Contacto, s.Detalle as De, Observaciones,e.nInventario,e.Cantidad, u.Direccion, u.Localidad,  d.Provincia, t.Transporta, m.nSerie, a.Detalle, b.Detalle as Marcas from Remito r   inner join Transporte t on r.Id_Transporte = t.Id_Transporte inner join Movimientos m on r.id_Remito = m.id_Remito  inner join Equipos e on m.nSerie = e.serial inner join Articulos a on e.id_Art = a.id_Art inner join Sector s on s.id_Sec = r.De inner join Sector se on se.id_Sec = r.Para inner join Marca b on b.id_Marca = a.id_Marca inner join UbicacionEdificio u on u.Id_Ubicacion = se.Id_Ubicacion inner join Distritos d on d.id_Prov = u.id_Prov where r.id_Remito =  @id_Remito"
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
            parameters.push({ name: 'Para', type: TYPES.VarChar, val: req.body.Para });
            parameters.push({ name: 'Fecha', type: TYPES.DateTime, val: req.body.Fecha});
            parameters.push({ name: 'Contacto', type: TYPES.VarChar, val: req.body.Contacto });
            parameters.push({ name: 'De', type: TYPES.VarChar, val: req.body.De });
            parameters.push({ name: 'Id_Transporte', type: TYPES.Int, val: req.body.Id_Transporte });
            parameters.push({ name: 'Reemplazo', type: TYPES.VarChar, val: req.body.Reemplazo });
            parameters.push({ name: 'CantKits', type: TYPES.Int, val: req.body.CantKits });
            parameters.push({ name: 'Observaciones', type: TYPES.VarChar, val: req.body.Observaciones });
            parameters.push({ name: 'Id_Usuario', type: TYPES.Int, val: req.body.Id_Usuario });
          
            dbContext.post("InsertOrUpdateRemito", parameters, function (error, data) {
                return res.json(response(data, error));
    
            });
        }
    
        function _delete(req, res) {    
    
                     var parameters = [];
            
                     if (req.data.id_Remito) {
                         var parameters = [];
            
                         parameters.push({ name: 'id_Remito', type: TYPES.Int, val: req.data.id_Remito });
            
                         var query = "delete from remito where id_remito = @id_Remito"
            
                         dbContext.getQuery(query, parameters, false, function (error, data, rowCount) {
                             if (rowCount > 0) {
                                 return res.json('la remito a sido borrada');
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
    
             dbContext.post("InsertOrUpdateRemito", parameters, function (error, data) {
                 return res.json(response(data, error));
             });
         }
    
     function find(req, res, next) {
    
        if (req.params.remitoId) {
            var parameters = [];
    
             parameters.push({ name: 'id_Remito', type: TYPES.Int, val: req.params.remitoId });
    
             var query = "select * from remito where id_Remito = @id_Remito"
    
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

module.exports = remitoRepository;

