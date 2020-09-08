const express = require('express');
const { request } = require('express');
function eRoutes() {
    const router = express.Router();
    var articulos = require('./articulos/articulosRoutes')(router);
    var marca = require('./Marca/marcaRoutes')(router);
    var login = require('./login/loginRoutes')(router);
    var sector = require('./sector/sectorRoutes')(router);
    var transporte = require('./transporte/transporteRoutes')(router);
    var equipos = require('./equipo/equipoRoutes')(router);
    var remito = require('./remito/remitoRoutes')(router);
    var nuevaActa = require('./nuevaActa/nuevaActaRoutes')(router);
    var NAM = require('./nuevaActaMovmientos/NAMRoutes')(router);
    var NAE = require('./nuevaActaEquipo/NAERoutes')(router);
    var token = require('./loginToken/tokenRoutes')(router);
    var tipo = require('./Tipo/tipoRoutes')(router);
    var ordenCompra = require("./OrdenDecompra/ordenCompraRoutes")(router);
    var estado = require("./estado/estadoRoutes")(router);
    var historial = require("./historial/historialRoutes")(router);
    var histoActa = require("./historial/histoActaRoutes")(router);
    var cargaGranel = require("./cargaGranel/cargaGranelRoutes")(router);
    var tipoPuesto = require("./tipoPuesto/tipoPuestoRoutes")(router);
    var gerencia = require("./gerencia/gerenciaRoutes")(router);
    var UbicacionEdif = require("./ubicacionEdif/ubicacionEdifRoutes")(router);
    var usuario = require("./usuarios/usuariosRoutes")(router);
    return router;
}
module.exports = eRoutes;