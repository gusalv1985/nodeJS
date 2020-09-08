const _articulosRepository = require("./articulosRepository");
const dbContext = require("../database/dbContext");

module.exports = function (router) {
    const articulosRepository = _articulosRepository(dbContext);
router.route('/articulos')
    .get(articulosRepository.getAll)
    .post(articulosRepository.post);

router.use('/articulos/:articulosId', articulosRepository.intercept);

router.route('/articulos/:articulosId')
    .get(articulosRepository.get)
    .put(articulosRepository.put)
    .delete(articulosRepository.delete);

}

