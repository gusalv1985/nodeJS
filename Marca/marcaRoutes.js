const _marcaRepository = require("./marcasRepository");
const dbContext = require("../database/dbContext");

module.exports = function (router) {
    const marcaRepository = _marcaRepository(dbContext);
router.route('/marca')
    .get(marcaRepository.getAll)
    .post(marcaRepository.post);

router.use('/marca/:marcaId', marcaRepository.intercept);

router.route('/marca/:marcaId')
    .get(marcaRepository.get)
    .put(marcaRepository.put)
    .delete(marcaRepository.delete);

}

