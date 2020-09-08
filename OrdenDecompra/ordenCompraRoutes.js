const _ordenCompraRepository = require("./ordenCompraRepository");
const dbContext = require("../database/dbContext");

module.exports = function (router) {
    const ordenCompraRepository = _ordenCompraRepository(dbContext);
router.route('/ordenCompra')
    .get(ordenCompraRepository.getAll)
    .post(ordenCompraRepository.post);

router.use('/ordenCompra/:ordenCompraId', ordenCompraRepository.intercept);

router.route('/ordenCompra/:ordenCompraId')
    .get(ordenCompraRepository.get)
    .put(ordenCompraRepository.put)
    .delete(ordenCompraRepository.delete);

}

