const jwt = require('jsonwebtoken');
const JWT_Secret = "987654"
const sql = require('mssql');

 function loginRepository() {

      function post(req, res) {

            if (req.body) {
              let _userName = req.body.Usuario
              let _userPassword = req.body.Pass
              var payload = {
                iat: (new Date().getTime() / 1000),
                _userName
              };
              let token = jwt.sign( payload, JWT_Secret); 

            var sqlConfig = require("../database/config")

              sql.connect(sqlConfig.sqlConfig).then(function (pool) {
       
                let query = "EXEC Usuarioslogin '" + _userName + "'";
                return pool.request().query(query).then(function (result) {
        
                    let _returnSql = result.recordset[0].RETURN;
        
                    if (_returnSql === 1) {
                        sql.close();
                          res.status(403).send({
                            errorMessage: 'Usuario o contraseña incorrecta'
                          });
                    } else {
                        if (_userPassword == _returnSql) {                        
                            sql.close();
                            delete result.recordset[0].RETURN;

                            
                            res.status(200).send({
                              signed_user: _userName,
                              token:token,   
                        })
                        }
                        else {
                            sql.close();
                              res.status(403).send({
                                errorMessage: 'Usuario o contraseña incorrecta'
                              });
        
                        }
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
            sql.connect(sqlConfig.sqlConfig).then(function (pool){
              let query = "EXEC CargaToken '" + _userName + "','"+ token +"'";
              return pool.request().query(query).then(function (result){
                
              }).catch(function (err) {
                    sql.close();
                    res.status(403).send({
                      errorMessage: 'Error en Base de datos'
                    });
                });

            }).catch(function (err) {
              sql.close();
              res.status(403).send({
                errorMessage: 'Error en Base de datos'
              });
          });
          }
        }
            
                  
    return {post}
}

module.exports = loginRepository;