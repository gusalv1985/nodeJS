const sql = require('mssql');

 function tokenRepository() {

      function post(req, res) {

            if (req.body) {
              let token = req.body.token
            
            var sqlConfig = require("../database/config")

              sql.connect(sqlConfig.sqlConfig).then(function (pool) {
       
                let query = "EXEC verificarToken '" + token + "'";
                return pool.request().query(query).then(function (result) {
        
                    let _returnSql = result.recordset[0].RETURN;
        
                    if (_returnSql === 1) {
                        sql.close();
                          res.status(403).send({
                            errorMessage: 'Token no existe'
                          });
                    } else {
                        res.status(200).send({
                          token: "true"   
                        })
                      }
                   
                }).catch(function (err) {
                    sql.close();
                    res.status(403).send({
                      errorMessage: 'Error en Base de datos'
                    });
                });

            }).catch(function (errsql) {
                sql.close();
                res.status(403).send({
                  errorMessage: 'Error en Base de datos'
                });
            })
          }
        }
            
                  
    return {post}
}

module.exports = tokenRepository;