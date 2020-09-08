const _gerenciaRepository = require("./gerenciaRepository");
const dbContext = require("../database/dbContext");

module.exports = function (router) {
    const gerenciaRepository = _gerenciaRepository(dbContext);
router.route('/gerencia')
    .get(gerenciaRepository.getAll)
    .post(gerenciaRepository.post);

router.use('/gerencia/:gerenciaId', gerenciaRepository.intercept);

router.route('/gerencia/:gerenciaId')
    .get(gerenciaRepository.get)
    .put(gerenciaRepository.put)
    .delete(gerenciaRepository.delete);

}

