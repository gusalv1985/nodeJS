const _ubicacionEdifRepository = require("./ubicacionEdifRepository");
const dbContext = require("../database/dbContext");

module.exports = function (router) {
    const ubicacionEdifRepository = _ubicacionEdifRepository(dbContext);
router.route('/ubicacionEdif')
    .get(ubicacionEdifRepository.getAll)
    .post(ubicacionEdifRepository.post);

router.use('/ubicacionEdif/:ubicacionEdifId', ubicacionEdifRepository.intercept);

router.route('/ubicacionEdif/:ubicacionEdifId')
    .get(ubicacionEdifRepository.get)
    .put(ubicacionEdifRepository.put)
    .delete(ubicacionEdifRepository.delete);

}

