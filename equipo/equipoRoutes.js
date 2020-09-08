const _equipoRepository = require("./equipoRepository");
const dbContext = require("../database/dbContext");

module.exports = function (router) {
    const equipoRepository = _equipoRepository(dbContext);
router.route('/equipos')
    .get(equipoRepository.getAll)
    .post(equipoRepository.post);

router.use('/equipos/:equipoId', equipoRepository.intercept);

router.route('/equipos/:equipoId')
    .get(equipoRepository.get)
    .put(equipoRepository.put)
    .delete(equipoRepository.delete);

}
