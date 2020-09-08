
 function cargaGranelRepository() {

    function post(req, res) {
  
            var Connection = require('tedious').Connection;  
            var Request = require('tedious').Request;  
            var TYPES = require('tedious').TYPES;  
            var async = require('async');
            var config = require("../database/config")
          
             var connection = new Connection(config.config);  

            // conexion a la base
            connection.on('connect', function(err) {  
                if (err) {
                    console.log(err);
                }  
                else    {
                   // console.log("Connected");

                    // ejecutar las funciones del array
                    async.waterfall([
                        function Start(callback){
                            callback(null);
                        },
                        
                        function Insert(callback){
                           

                                request = new Request("insert into [dbo].[Equipos]([serial],[id_Art],[id_Estado],[nInventario],[Remito_Factura],[id_OC],[Obvs],[id_Sec],[FechaAlta],[Cantidad]) values (@serial,@id_Art,@id_Estado,@nInventario,@Remito_Factura,@id_OC,@Obvs,@id_Sec,@FechaAlta,@Cantidad)", function(err){  
                                if (err) {
                                        console.log(err);
                                    }  
                                }
                            );  
                            
                            request.addParameter('serial', TYPES.VarChar, req.body.serial);
                            request.addParameter('id_Art', TYPES.Int, req.body.id_Art);  
                            request.addParameter('id_Estado', TYPES.Int, req.body.id_Estado); 
                            request.addParameter('nInventario', TYPES.VarChar, req.body.nInventario); 
                            request.addParameter('Remito_Factura', TYPES.VarChar, req.body.Remito_Factura); 
                            request.addParameter('id_OC', TYPES.Int, req.body.id_OC); 
                            request.addParameter('Obvs', TYPES.VarChar, req.body.Obvs); 
                            request.addParameter('id_Sec', TYPES.Int, req.body.id_Sec); 
                            //request.addParameter('NoSerial', TYPES.Binary, req.body.NoSerial); 
                            request.addParameter('FechaAlta', TYPES.Date, req.body.FechaAlta); 
                            request.addParameter('Cantidad', TYPES.Int, req.body.Cantidad); 

                            // request.on('row', function(columns) {  
                            //     columns.forEach(function(column) {  
                            //     if (column.value === null) {  
                            //         console.log('NULL');  
                            //     } else {  
                            //         console.log( column.value);  
                            //     }  
                            //     });  
                            // }); 

                            // comprobar cantidad de filas insertadas
                            request.on('doneInProc', function(rowCount, more) {  
                                //console.log(rowCount + ' fila insertada');  
                                callback(null);
                            });             

                            connection.execSql(request);  
                        },
                        function Read(callback){
                            request.callback = function (err, rowCount, rows) {
                                // filas no se está configurando, pero sí rowCount. Puede ser un error
                                if (err) {
                                 //console.log(err)
                                } else {
                                  return res.status(200).send()
                                }
                            };

                            // numero de filas leidas
                            request.on('doneInProc', function (rowCount, more, rows) {  
                                //console.log(rowCount + ' filas devueltas');  
                                callback(null);
                            });  

                            connection.execSql(request);  
                        }],
                        function Complete(err, result) {
                            if(err) {
                                console.log("Error:", err);
                            }
                            else {
                                //console.log("Fin!");
                            }
                        }
                    )
                }
            });
        }
    return {post: post}
    }

module.exports = cargaGranelRepository;

