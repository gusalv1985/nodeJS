const _loginRepository = require("./loginRepository");
const dbContext = require("../database/dbContext");

module.exports = function (router) {
    const Repository = _loginRepository(dbContext);
    router.route('/autentificacion').post(Repository.post);
    
}