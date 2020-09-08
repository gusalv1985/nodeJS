const _NAMRepository = require("./NAMRepository");
const dbContext = require("../database/dbContext");

module.exports = function (router) {
    const NAMRepository = _NAMRepository(dbContext);
router.route('/NAMovimientos').post(NAMRepository.post);
}