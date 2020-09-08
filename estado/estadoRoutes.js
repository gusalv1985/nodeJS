const _estadoRepository = require("./estadoRepository");
const dbContext = require("../database/dbContext");

module.exports = function (router) {
    const estadoRepository = _estadoRepository(dbContext);
router.route('/estado')
    .get(estadoRepository.getAll)


}

