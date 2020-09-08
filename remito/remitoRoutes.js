const _remitoRepository = require("./remitoRepository");
const dbContext = require("../database/dbContext");

module.exports = function (router) {
    const remitoRepository = _remitoRepository(dbContext);
router.route('/remito')
    .get(remitoRepository.getAll)
    .post(remitoRepository.post);

router.use('/remito/:remitoId', remitoRepository.intercept);

router.route('/remito/:remitoId')
    .get(remitoRepository.get)
    .put(remitoRepository.put)
    .delete(remitoRepository.delete);

}
