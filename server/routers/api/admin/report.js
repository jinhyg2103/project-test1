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
    router.get('/report/get/search', authValidHelper.is_login, (request, response) => {
        console.log('(GET) controller/api/admin/report.js :: /admin/report/get/search called');
        let query = {
            from: Number(request.query.from) || 0,
            count: Number(request.query.count) || 20,
            searchQuery: request.query.searchQuery || null,
        };
        Models.report().get.search(query, (err, data) => {
            if (data && !err) {
                responseHelper.success_send(200, data, response);
            } else {
                responseHelper.err_send(err, response);
            }
        });
    });
    router.get('/report/count/search', authValidHelper.is_login, (request, response) => {
        console.log('(GET) controller/api/admin/report.js :: /admin/report/count/search called');
        let query = {
            searchQuery: request.query.searchQuery || null,
        };
        Models.report().count.search(query, (err, data) => {
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
    return router;
};

