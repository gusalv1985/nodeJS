const tokenRepository = require("./tokenRepository");
const dbContext = require("../database/dbContext");

module.exports = function (router) {
    const Repository = tokenRepository(dbContext);
    router.route('/token').post(Repository.post);
    
}