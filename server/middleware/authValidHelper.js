const responseHelper = require(__base + 'lib/responseHelper')
const c = require(__base + 'config/const');

module.exports = {
    is_login: (request, response, next) => {
        if (!request.user) {
            responseHelper.err_send('AuthenticationFailed', response);
        } else {
            next();
        }
    },
    isAdmin: (request, response, next) => {
        //if (!request.user || c.admin.indexOf(request.user.email) == -1){
        if (!request.user) {
            responseHelper.err_send('AuthenticationFailed', response);
        } else {
            next();
        }
    },
};
