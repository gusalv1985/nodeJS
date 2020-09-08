const _histoActaRepository = require("./histoActaRepository");
const dbContext = require("../database/dbContext");

module.exports = function (router) {
    const histoActaRepository = _histoActaRepository(dbContext);

router.use('/histoActa/:histoActaId', histoActaRepository.intercept);

router.route('/histoActa/:histoActaId')
    .get(histoActaRepository.get)


}
