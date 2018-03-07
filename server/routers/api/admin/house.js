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
    router.get('/house/get/search', authValidHelper.is_login, (request, response) => {
        console.log('(GET) controller/api/admin/house.js :: /admin/house/get/search called');
        let query = {
            from: Number(request.query.from) || 0,
            count: Number(request.query.count) || 20,
            searchQuery: request.query.searchQuery || null,
        };
        Models.house().get.list(query, (err, data) => {
            if (data && !err) {
                responseHelper.success_send(200, data, response);
            } else {
                responseHelper.err_send(err, response);
            }
        });
    });
    router.get('/house/count/search', authValidHelper.is_login, (request, response) => {
        console.log('(GET) controller/api/admin/house.js :: /admin/house/count/search called');
        let query = {
            searchQuery: request.query.searchQuery || null,
        };
        Models.house().count.list(query, (err, data) => {
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
    router.post('/house/delete', authValidHelper.is_login, (request, response) => {
        console.log('(POST) controller/api/user.js :: /house/delete called');
        let query = {};
        query.hId = request.body.hId;
        Models.house().delete(query, (err, data) => { // True or False
            if (!err) {
                responseHelper.success_send(200, data, response);
            } else {
                responseHelper.err_send(err, response);
            }
        });
    });
    return router;
};

