const _tipoPuestoRepository = require("./tipoPuestoRepository");
const dbContext = require("../database/dbContext");

module.exports = function (router) {
    const tipoPuestoRepository = _tipoPuestoRepository(dbContext);
router.route('/tipoPuesto')
    .get(tipoPuestoRepository.getAll)
    .post(tipoPuestoRepository.post);

router.use('/tipoPuesto/:tipoPuestoId', tipoPuestoRepository.intercept);

router.route('/tipoPuesto/:tipoPuestoId')
    .get(tipoPuestoRepository.get)
    .put(tipoPuestoRepository.put)
    .delete(tipoPuestoRepository.delete);

}

