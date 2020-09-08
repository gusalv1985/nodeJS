const _cargaGranelRepository = require("./cargaGranelRepository");
const dbContext = require("../database/dbContext");

module.exports = function (router) {
    const cargaGranelRepository = _cargaGranelRepository(dbContext);
router.route('/cargaGranel').post(cargaGranelRepository.post);
}