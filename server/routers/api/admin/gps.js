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
    router.get('/gps/get/accesses', authValidHelper.is_login, (request, response) => {
        console.log('(GET) controller/api/admin/gps.js :: /admin/gps/get/accesses called');
        let query = {
            from: Number(request.query.from) || 0,
            count: Number(request.query.count) || 20,
            searchQuery: request.query.searchQuery || null,
        };
        query.uId = request.user.id;
        Models.gps().get.access(query, (err, data) => {
            if (data && !err) {
                responseHelper.success_send(200, data, response);
            } else {
                responseHelper.err_send(err, response);
            }
        });
    });
    router.get('/gps/get/usages', authValidHelper.is_login, (request, response) => {
        console.log('(GET) controller/api/admin/gps.js :: /admin/gps/get/usages called');
        let query = {
            from: Number(request.query.from) || 0,
            count: Number(request.query.count) || 20,
            searchQuery: request.query.searchQuery || null,
        };
        query.uId = request.user.id;
        Models.gps().get.usage(query, (err, data) => {
            if (data && !err) {
                responseHelper.success_send(200, data, response);
            } else {
                responseHelper.err_send(err, response);
            }
        });
    });
    router.get('/gps/get/reads', authValidHelper.is_login, (request, response) => {
        console.log('(GET) controller/api/admin/gps.js :: /admin/gps/get/reads called');
        let query = {
            from: Number(request.query.from) || 0,
            count: Number(request.query.count) || 20,
            searchQuery: request.query.searchQuery || null,
        };
        query.uId = request.user.id;
        Models.gps().get.read(query, (err, data) => {
            if (data && !err) {
                responseHelper.success_send(200, data, response);
            } else {
                responseHelper.err_send(err, response);
            }
        });
    });
    router.get('/gps/count/accesses', authValidHelper.is_login, (request, response) => {
        console.log('(GET) controller/api/admin/user.js :: /admin/gps/count/accesses called');
        let query = {};
        query.uId = request.user.id;
        Models.gps().count.access(query, (err, data) => {
            if (data && !err) {
                responseHelper.success_send(200, data, response);
            } else {
                responseHelper.err_send(err, response);
            }
        });
    });
    router.get('/gps/count/usages', authValidHelper.is_login, (request, response) => {
        console.log('(GET) controller/api/admin/user.js :: /admin/gps/count/usages called');
        let query = {};
        query.uId = request.user.id;
        Models.gps().count.usage(query, (err, data) => {
            if (data && !err) {
                responseHelper.success_send(200, data, response);
            } else {
                responseHelper.err_send(err, response);
            }
        });
    });
    router.get('/gps/count/reads', authValidHelper.is_login, (request, response) => {
        console.log('(GET) controller/api/admin/user.js :: /admin/gps/count/reads called');
        let query = {};
        query.uId = request.user.id;
        Models.gps().count.read(query, (err, data) => {
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
    router.post('/gps/create/access', authValidHelper.is_login, (request, response) => {
        console.log('(GET) controller/api/gps.js :: /gps/create/access called');
        let query = {
            uId: request.user.id,
            description: request.body.description,
        };
        Models.gps().create.access(query, (err, data) => {
            if (data && !err) {
                responseHelper.success_send(200, data, response);
            } else {
                responseHelper.err_send(err, response);
            }
        });
    });
    return router;
};

