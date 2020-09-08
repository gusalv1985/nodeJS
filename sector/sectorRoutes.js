const _sectorRepository = require("./sectorRepository");
const dbContext = require("../database/dbContext");

module.exports = function (router) {
    const sectorRepository = _sectorRepository(dbContext);
router.route('/sector')
    .get(sectorRepository.getAll)
    .post(sectorRepository.post);

router.use('/sector/:sectorId', sectorRepository.intercept);

router.route('/sector/:sectorId')
    .get(sectorRepository.get)
    .put(sectorRepository.put)
    .delete(sectorRepository.delete);

}