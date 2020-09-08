const _tipoRepository = require("./tipoRepository");
const dbContext = require("../database/dbContext");

module.exports = function (router) {
    const tipoRepository = _tipoRepository(dbContext);
router.route('/tipo')
    .get(tipoRepository.getAll)
    .post(tipoRepository.post);

router.use('/tipo/:tipoId', tipoRepository.intercept);

router.route('/tipo/:tipoId')
    .get(tipoRepository.get)
    .put(tipoRepository.put)
    .delete(tipoRepository.delete);

}

