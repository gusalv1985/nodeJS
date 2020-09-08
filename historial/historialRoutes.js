const _historialRepository = require("./historialRepository");
const dbContext = require("../database/dbContext");

module.exports = function (router) {
    const historialRepository = _historialRepository(dbContext);

router.use('/historial/:historialId', historialRepository.intercept);

router.route('/historial/:historialId')
    .get(historialRepository.get)


}
