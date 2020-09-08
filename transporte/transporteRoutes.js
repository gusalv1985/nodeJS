const _transporteRepository = require("./transporteRepository");
const dbContext = require("../database/dbContext");

module.exports = function (router) {
    const transporteRepository = _transporteRepository(dbContext);
    router.route('/transporte').get(transporteRepository.getAll)
 

}

