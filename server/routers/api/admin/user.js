const async = require('async');
const fs = require('fs');
const Router = require('express');
const multiparty = require('multiparty');

const responseHelper = require(__base + 'lib/responseHelper');
const Models = require(__base + 'models/index');
const authValidHelper = require(__base + 'middleware/authValidHelper');

module.exports = () => {
    let router = Router();

    ////////////////////////////////////
    //////////       GET      //////////
    ////////////////////////////////////
    router.get('/user/get/search', authValidHelper.is_login, (request, response) => {
        console.log('(GET) controller/api/admin/user.js :: /admin/user/get/search called');
        let query = {
            from: Number(request.query.from) || 0,
            count: Number(request.query.count) || 20,
            searchQuery: request.query.searchQuery || null,
            isCertified: null,
            notRegistered: null,
        };
        if (request.query.isCertified) query.isCertified = (request.query.isCertified === 'true');
        if (request.query.notRegistered) query.notRegistered = (request.query.notRegistered === 'true');
        query.uId = request.user.id;
        Models.user().get.search(query, (err, data) => {
            if (data && !err) {
                responseHelper.success_send(200, data, response);
            } else {
                responseHelper.err_send(err, response);
            }
        });
    });
    router.get('/user/count/search', authValidHelper.is_login, (request, response) => {
        console.log('(GET) controller/api/admin/user.js :: /admin/user/count/search called');
        let query = {
            searchQuery: request.query.searchQuery || null,
            isCertified: null,
            notRegistered: null,
        };
        if (request.query.isCertified) query.isCertified = (request.query.isCertified === 'true');
        if (request.query.notRegistered) query.notRegistered = (request.query.notRegistered === 'true');
        query.uId = request.user.id;
        Models.user().count.search(query, (err, data) => {
            if (data && !err) {
                responseHelper.success_send(200, data, response);
            } else {
                responseHelper.err_send(err, response);
            }
        });
    });
    ////////////////////////////////////
    ///////////     POST    ////////////
    ////////////////////////////////////
    router.post('/user/delete', authValidHelper.is_login, (request, response) => {
        console.log('(POST) controller/api/admin/user.js :: /user/delete called');
        let query = {};
        query.uId = request.body.uId;
        Models.user().delete(query, (err, data) => { // True or False
            if (!err) {
                responseHelper.success_send(200, data, response);
            } else {
                responseHelper.err_send(err, response);
            }
        });
    });
    return router;
};

