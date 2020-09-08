
 function NAMRepository() {

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
                           

                                request = new Request("INSERT INTO [dbo].[Movimientos] ([id_Remito],[nSerie],[cantidad]) VALUES (@idRemito, @serialElegido, @cantidad)", function(err){  
                                if (err) {
                                        console.log(err);
                                    }  
                                }
                            );  
                            
                            request.addParameter('idRemito', TYPES.Int, req.body.idRemito);
                            request.addParameter('serialElegido', TYPES.VarChar, req.body.serialElegido);  
                            request.addParameter('cantidad', TYPES.Int, req.body.cantidad); 

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

module.exports = NAMRepository;

