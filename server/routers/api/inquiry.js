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
    router.get('/inquiry/get/search', authValidHelper.is_login, (request, response) => {
        console.log('(GET) controller/api/house.js :: /inquiry/get/search called');
        let query = {
            from: Number(request.query.from) || 0,
            count: Number(request.query.count) || 20,
            uIdUser: Number(request.query.uIdUser) || null,
            uIdAgency: Number(request.query.uIdAgency) || null,
        };
        Models.inquiry().get.search(query, (err, data) => {
            if (data && !err) {
                responseHelper.success_send(200, data, response);
            } else {
                responseHelper.err_send(err, response);
            }
        });
    });
    router.get('/inquiry/count/search', authValidHelper.is_login, (request, response) => {
        console.log('(GET) controller/api/house.js :: /inquiry/count/search called');
        let query = {
            uIdUser: Number(request.query.uIdUser) || null,
            uIdAgency: Number(request.query.uIdAgency) || null,
        };
        Models.inquiry().count.search(query, (err, data) => {
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
    router.post('/inquiry/create', authValidHelper.is_login, (request, response) => {
        console.log('(POST) controller/api/house.js :: /inquiry/create called');
        let query = {
            hId: Number(request.body.hId) || null,
            uIdAgency: Number(request.body.uIdAgency) || null,
            aId: Number(request.body.aId) || null,
        };
        query.uIdUser = request.user.id;
        Models.inquiry().create(query, (err, data) => {
            if (data && !err) {
                responseHelper.success_send(200, data, response);
            } else {
                responseHelper.err_send(err, response);
            }
        });
    });
    router.post('/inquiry/accept', authValidHelper.is_login, (request, response) => {
        console.log('(POST) controller/api/house.js :: /inquiry/accept called');
        let query = {
            ihId: Number(request.body.ihId) || null,
        };
        Models.inquiry().accept(query, (err, data) => {
            if (data && !err) {
                responseHelper.success_send(200, data, response);
            } else {
                responseHelper.err_send(err, response);
            }
        });
    });
    router.post('/inquiry/cancel', authValidHelper.is_login, (request, response) => {
        console.log('(POST) controller/api/house.js :: /inquiry/cancel called');
        let query = {
            ihId: Number(request.body.ihId) || null,
        };
        Models.inquiry().cancel(query, (err, data) => {
            if (data && !err) {
                responseHelper.success_send(200, data, response);
            } else {
                responseHelper.err_send(err, response);
            }
        });
    });
    return router;
};

