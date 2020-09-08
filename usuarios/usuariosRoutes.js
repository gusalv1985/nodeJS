const _usuariosRepository = require("./usuariosRepository");
const dbContext = require("../database/dbContext");

module.exports = function (router) {
    const usuariosRepository = _usuariosRepository(dbContext);
router.route('/usuarios')
    .get(usuariosRepository.getAll)
    .post(usuariosRepository.post);

router.use('/usuarios/:usuariosId', usuariosRepository.intercept);

router.route('/usuarios/:usuariosId')
    .get(usuariosRepository.get)
    .put(usuariosRepository.put)
    .delete(usuariosRepository.delete);

}

