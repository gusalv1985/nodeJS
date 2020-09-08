const _NAERepository = require("./NAERepository");
const dbContext = require("../database/dbContext");

module.exports = function (router) {
    const NAERepository = _NAERepository(dbContext);
router.route('/NAEquipo').post(NAERepository.post);
}