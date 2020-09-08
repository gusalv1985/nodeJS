var response = require("../shared/response");

var TYPES = require('tedious').TYPES;

 function nuevaActaRepository(dbContext) {

    function post(req, res) {
    var parameters = [];

            parameters.push({ name: 'idRemito', type: TYPES.Int, val: req.body.idRemito});
            parameters.push({ name: 'Para', type: TYPES.Int, val: req.body.Para });
            parameters.push({ name: 'Fecha', type: TYPES.DateTime2, val: req.body.Fecha});
            parameters.push({ name: 'Contacto', type: TYPES.VarChar, val: req.body.Contacto });
            parameters.push({ name: 'De', type: TYPES.Int, val: req.body.De });
            parameters.push({ name: 'Id_Transporte', type: TYPES.Int, val: req.body.Id_Transporte });
            parameters.push({ name: 'Observaciones', type: TYPES.VarChar, val: req.body.Observaciones });
            parameters.push({ name: 'token', type: TYPES.VarChar, val: req.body.token });
                
            dbContext.post("InsertOrUpdateNuevaActaRemito", parameters, function (error, data) {
                return res.json(response(data, error));
    
            });
        }
    
    
    
    return {post: post}
    }

module.exports = nuevaActaRepository;

